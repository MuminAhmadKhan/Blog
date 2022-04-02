describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Minu',
        email: 'minu@f.com',
        password:'1234'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.get('#name')
      cy.get('#password')
      cy.contains('Submit')

    })

    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.get('#name').type('Minu')
        cy.get('#password').type('1234')
        cy.get('#Login').click()
        cy.contains('Minu')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#name').type('mnu')
        cy.get('#password').type('1234')
        cy.contains('Submit').click()

        cy.contains('Danger')
      })
    })
    describe('When logged in', function() {
      beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
        
      const user = {
        name: 'Minu',
        email: 'minu@f.com',
        password:'1234'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.request('POST', 'http://localhost:3001/api/login', {
      "name": 'Minu', "password": '1234'
    }).then(response => {
      localStorage.setItem('loggedinUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')

      })
    })
      it('A blog can be created', function() {
        
        cy.contains('Show Form').click()
        cy.get('#name').type('mtech')
        cy.get('#author').type('khat')
        cy.get('#url').type('@.com')
        cy.contains('Save').click()

        cy.contains('mtech')
      })
      it('like and delete', function() {
        cy.contains('Show Form').click()
        cy.get('#name').type('mtech')
        cy.get('#author').type('khat')
        cy.get('#url').type('@.com')
        cy.contains('Save').click()
        cy.contains('Expand').click()
        cy.contains('Like').click()
        cy.contains(1)
        cy.contains('Remove').click()
    
        cy.contains('mtech').should('not.exist');
      })
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
        
      const user = {
        name: 'Minu',
        email: 'minu@f.com',
        password:'1234'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.request('POST', 'http://localhost:3001/api/login', {
      "name": 'Minu', "password": '1234'
    }).then(response => {
      localStorage.setItem('loggedinUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')})
      cy.createBlog({
        title:"abc",
        author:"def",
        url:"ghi"
      })
      cy.createBlog({
        title:"qwe",
        author:"rty",
        url:"uio"
      })
      cy.createBlog({
        title:"pas",
        author:"dfg",
        url:"hjk"
      })
      cy.createBlog({
        title:"klz",
        author:"xcv",
        url:"bnm"
      })

    
  })
  it('like and checksort', function() {
    cy.contains('pas').parent()
    .contains('Expand').click().get('.like').click()
    .get('.like').click()
      
    cy.contains('klz').parent()
    .contains('Expand').click()
    cy.contains('klz').parent().find('.like').click()
    cy.contains('klz').parent().find('.like').click()
    cy.contains('klz').parent().find('.like').click()
   
    cy.contains('qwe').parent()
      .contains('Expand').click()
    cy.get('.like_no').should('have.length', 3).then(($els) => {
      // we get a list of jQuery elements
      // let's convert the jQuery object into a plain array
      return (
        Cypress.$.makeArray($els)
          // and extract inner text from each
          .map((el) => el.innerText)
      )
    })
    .should('deep.equal', ['3', '2', '0'])
      
     
   

  })
})