describe('Spot booking flow', function() {

    it('should allow to book a spot', function() {
        cy.visit('http://localhost:3000');
        cy.server()
        cy.get('.SpotItem').first().should('exist')
        cy.get('.SpotItem-info .TextButton').first()
            .click()
        cy.get('.SpotDetails').should('exist')
        cy.get('.SpotDetails button').click()
        cy.location('pathname').should('eq', '/1/checkout')
        cy.get('[name="firstName"]').type('Sergey')
        cy.get('[name="lastName"]').type('Uss')
        cy.get('[name="email"]').type('sergey.uss@gmail.com')
        cy.get('[name="phone"]').type('4169857741')
        cy.get('button[type="submit"]').click()
        cy.location('pathname').should('eq', '/confirmation')
        cy.get('button').click()
        cy.location('pathname').should('eq', '/')
    })
})
