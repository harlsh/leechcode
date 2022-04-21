describe('My First Test', () => {
  it('Should redirect to localhost:4200/home', () => {
    cy.visit('/');
    cy.url().should('includes','home');
  })

 

})



describe('Sprint 3 tests', () => {
  it('The problem page should redirect an unauthenticated user to the sign in page', () => {
    cy.visit('/myprofile/problemlist');
    cy.url().should('includes','login');
  })
  it('Should have the sign in with google button on the login page', () => {
    cy.visit('/login');
    cy.contains('Sign In with Google');
  })
  it('Admin Panel Should redirect an unauthenticated user to the sign in page', () => {
    cy.visit('/myprofile/createproblem');
    cy.url().should('includes','login');
  })
  it('Forgot password link should redirect to the forgot password page', () => {
    cy.visit('/login');
    cy.contains('Forgot Password');
  })
  it('Register page should redirect to the sign up page', () => {
    cy.visit('/register');
    cy.contains('Already have an account?');
  })

})