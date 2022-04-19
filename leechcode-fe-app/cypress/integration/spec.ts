describe('My First Test', () => {
  it('Should redirect to localhost:4200/home', () => {
    cy.visit('/');
    cy.url().should('includes','home');
  })
  it('Should display the corresponding page for the Two Sum Problem', () => {
    cy.visit('/problem/two-sum/description');
    cy.url().should('includes','two-sum');
    cy.contains('Given an array of integers');
    cy.contains('Easy');
  })
  it('Should display the corresponding page for the Coin Change Problem', () => {
    cy.visit('/problem/coin-change/description');
    cy.url().should('includes','coin-change');
    cy.contains('You are given an integer array');
    cy.contains('Medium');
  })
  it('Should display the corresponding page for the Add Two Numbers Problem', () => {
    cy.visit('/problem/add-two-numbers/description');
    cy.url().should('includes','add-two-numbers');
    cy.contains('The digits are stored in reverse order');
    cy.contains('It is guaranteed that the list');
  })

})



describe('Sprint 3 tests', () => {
  it('The problem page should redirect an unauthenticated user to the sign in page', () => {
    cy.visit('/admin/problemlist');
    cy.url().should('includes','login');
  })
  it('Should have the sign in with google button on the login page', () => {
    cy.visit('/login');
    cy.contains('Sign In with Google');
  })
  it('Admin Panel Should redirect an unauthenticated user to the sign in page', () => {
    cy.visit('/admin/createproblem');
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