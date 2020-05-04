const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, current) => acc + current.likes , 0)   
}

const favoriteBlog = (blogs) => {
    let max=0;
    for(let i=0; i<blogs.length;i++){
        if(blogs[i].likes>max){
            max= blogs[i].likes
        }
    }
    return blogs.find(blog => blog.likes === max)
}

const mostBlogs = (blogs) => {
    let mf = 1
    let m = 0
    let author;
    for (let i =0; i<blogs.length ; i++){
        for(let j = i; j<blogs.length; j++){
            if(blogs[i].author === blogs[j].author)
                m++
            if(mf<m){
                mf=m;
                author=blogs[i].author
            }
        }
        m=0;
    }
    return {author: author, blogs: mf}
}

const mostLikes = (blogs) => {
    
    let author = ''
    let likes = 0
    let max = 0
    

    for(let i=0;i<blogs.length;i++){
           const ugua = blogs.filter(blog => blogs[i].author === blog.author)
           let ugual = ugua.reduce((acc, a) => acc + a.likes ,0)           
           if(ugual>max)
           {
               max=ugual
           }
           if(max>likes)
           {
               author= ugua[0].author
               likes = max
           }

           if(blogs[i].likes>likes){
               likes=blogs[i].likes
               author=blogs[i].author      }

}
   
    return {author, likes}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}