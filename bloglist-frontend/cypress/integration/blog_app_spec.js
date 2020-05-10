describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')

  })


  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong')
    })
 

    describe.only('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function() {
        cy.get('#create').click()
        cy.get('#title').type('blog title')
        cy.get('#author').type('blog author')
        cy.get('#url').type('blog url')
        cy.get('#submitB').click()
        cy.contains('blog title')

      })

      describe('a blog exists', function() {
        beforeEach(function() {
          cy.get('#create').click()
          cy.get('#title').type('blog title')
          cy.get('#author').type('blog author')
          cy.get('#url').type('blog url')
          cy.get('#submitB').click()
        })
        it('A user can like a blog', function() {
          cy.contains('view').click()
          cy.contains('likes 0')
          cy.get('#likeb').click()
          cy.contains('likes 1')
        })

        it('A user can delete the blog', function() {
          cy.contains('view').click()
          cy.contains('remove').click()
          cy.should('not.contain', 'blog title')
        })

      })

      describe('when more blog exists', function() {
        beforeEach(function() {
          cy.get('#create').click()
          cy.get('#title').type('blogtitle')
          cy.get('#author').type('blog author')
          cy.get('#url').type('blog url')
          cy.get('#submitB').click()

          cy.get('#create').click()
          cy.get('#title').type('blog title2')
          cy.get('#author').type('blog author2')
          cy.get('#url').type('blog url2')
          cy.get('#submitB').click()

        })
        it('Blogs are ordered by like', function() {         
          cy.get('#blogtitle').click()
          cy.get('#likeb').click()
          cy.get(':nth-child(2)').contains('blogtitle')

        })


      })
  


    })
  })

})

