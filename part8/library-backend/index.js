const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const DataLoader = require('dataloader')
const MONGODB_URI = require('./config/db')

const { ApolloServer, AuthenticationError, UserInputError, gql, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const pubsub = new PubSub()

console.log('connecting to', MONGODB_URI)

mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    me: User
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
  }

  
  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ) : Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ) : Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
}
type Subscription {
  bookAdded : Book!
}  
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => { 
        const books = await Book.find({})
         
        if(args.author && args.genre){
            return books.filter(b => b.author === args.author).filter(b => b.genres.find(g => g === args.genre))
        }      
        else if(args.author){
         return books.filter(b => b.author === args.author)
        }
        else if (args.genre){
           
          return books.filter(b => b.genres.find(g =>g === args.genre)).map(async b => {
            const author = await Author.findById(b.author)
            return {title: b.title, published: b.published, genres: b.genres, author: author }
          })

        }
        else {
            return books.map(async b => {
              const author = await Author.findById(b.author)
              return {title: b.title, published: b.published, genres: b.genres, author: author }
            })
        }
        
      },
      allAuthors: () => Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      }

     },
      Author : {
          bookCount: async (root , args, {bookLoader}) => {
            return await bookLoader.load(root._id)
          }
      },
      Mutation : {
          addBook: async (root, args, {currentUser}) => {
            if (!currentUser) {
              throw new AuthenticationError("not authenticated")
          }        
           
          const author = await Author.findOne({ name: args.author})

          if(!author){
            throw new UserInputError("author not found")
          }
          
          const book = new Book ({... args, author})

              try{                
                await book.save()
              }
              catch(error){
                throw new UserInputError(error.message, {
                  invalidArgs: args
                })
              }
          pubsub.publish('BOOK_ADDED', {bookAdded: book}) 

          
          return book
          },
          editAuthor: async (root, args, {currentUser}) => {
            if (!currentUser) {
              throw new AuthenticationError("not authenticated")
          }
            const foundAuthor = await Author.findOne({ name: args.name})
            foundAuthor.born = args.setBornTo
            try {
              await foundAuthor.save()
            }
            catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args
              })
            }

            return foundAuthor
           
          },

          createUser: (root, args) => {
            const user = new User({ username: args.username , favoriteGenre: args.favuriteGenree})
        
            return user.save()
              .catch(error => {
                throw new UserInputError(error.message, {
                  invalidArgs: args,
                })
              })
          },
          login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
        
            if ( !user || args.password !== 'secred' ) {
              throw new UserInputError("wrong credentials")
            }
        
            const userForToken = {
              username: user.username,
              id: user._id,
            }
        
            return { value: jwt.sign(userForToken, JWT_SECRET) }
          }

      },
      Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
      }
           

      
    }
          
     
    
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('friends')
       
    const bookLoader = new DataLoader(async keys => {
      const result = await Book.find()  
      return keys.map(r1 =>  result.filter(r=>r1.equals(r.author)).length
        )
    
        
     
     }
      )
  
      return { currentUser,
      bookLoader
  
      }
    }

  
  },
  
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})