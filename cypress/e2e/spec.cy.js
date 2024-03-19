describe('Sause Demo Test', () => {

  it('Invalid Login Verification', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]')
    cy.get("#user-name").type('test')
    cy.get("#password").type('123')
    cy.get("#login-button").click()
    cy.get("h3[data-test='error']").invoke('text').then((text1) => {
      expect(text1).to.eq('Epic sadface: Username and password do not match any user in this service')
    })
  })
  it('Login and Add to Cart Verification', () => {

    cy.wait(2000);
    cy.visit('https://www.saucedemo.com')
    cy.get("#user-name").type('standard_user')
    cy.get("#password").type('secret_sauce')
    cy.get("#login-button").click()
    cy.fixture('cartItems.json').then(items => {
      items.forEach(item => {

        cy.log('Adding ' + item.ItemName)
        cy.contains('.inventory_item_name', item.ItemName)
          .parents('.inventory_item')
          .find('button').click();
      })
    })

    cy.get('.shopping_cart_link').click()
    cy.get('.title').should('contain', 'Your Cart')
    cy.fixture('cartItems.json').then(items => {
      items.forEach(item => {
        cy.get('.cart_list').should('contain', item.ItemName)
          .click();
      })
    })
  })
})
