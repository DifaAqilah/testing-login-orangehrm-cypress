class LoginPage {

  // ===== Locator =====
  usernameInput() {
    return cy.get('input[name="username"]')
  }

  passwordInput() {
    return cy.get('input[name="password"]')
  }

  loginButton() {
    return cy.get('button[type="submit"]')
  }

  alertMessage() {
    return cy.get('.oxd-alert-content-text')
  }

  errorMessage() {
    return cy.get('.oxd-input-field-error-message')
  }

  forgotPasswordLink() {
    return cy.get('.orangehrm-login-forgot-header')
  }

  resetPasswordTitle() {
    return cy.get('.orangehrm-forgot-password-title')
  }

  dashboardTitle() {
    return cy.get('.oxd-topbar-header-breadcrumb-module')
  }

  // ===== Intercept =====
  interceptValidate() {
    cy.intercept('POST', '**/auth/validate').as('validateLogin')
  }

  interceptResetPage() {
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('resetPage')
  }

  interceptShortcuts() {
    cy.intercept('GET', '**/dashboard/shortcuts*').as('shortcuts')
  }

  // ===== Action =====
  visit(url) {
    cy.visit(url)
    this.usernameInput().should('be.visible')
  }

  inputUsername(username) {
    this.usernameInput().type(username)
  }

  inputPassword(password) {
    this.passwordInput().type(password)
  }

  clickLogin() {
    this.loginButton().click()
  }

  login(username, password) {
    this.inputUsername(username)
    this.inputPassword(password)
    this.clickLogin()
  }

  loginWithEnter(username, password) {
    this.inputUsername(username)
    this.passwordInput().type(password + '{enter}')
  }

  clickForgotPassword() {
    this.forgotPasswordLink().click()
  }

  // ===== Assertion =====
  verifyLoginSuccess() {
    cy.url().should('include', '/dashboard/index')
    this.dashboardTitle().should('contain.text', 'Dashboard')
  }

  verifyStillOnLoginPage() {
    cy.url().should('include', '/auth/login')
  }

  verifyAlertMessage(message) {
    this.alertMessage().should('have.text', message)
  }

  verifyRequiredMessage(jumlah, message) {
    this.errorMessage().should('have.length', jumlah)
    this.errorMessage().first().should('have.text', message)
  }

  verifyValidateRedirect(lokasi) {
    cy.wait('@validateLogin').then((interception) => {
      expect(interception.response.statusCode).to.eq(302)
      expect(interception.response.headers.location).to.include(lokasi)
    })
  }

  verifyNoValidateRequest() {
    cy.get('@validateLogin.all').should('have.length', 0)
  }

  verifyResetPageLoaded() {
    cy.wait('@resetPage').its('response.statusCode').should('eq', 200)
  }

  verifyShortcutsLoaded() {
    cy.wait('@shortcuts', { timeout: 20000 })
      .its('response.statusCode')
      .should('be.oneOf', [200, 304])
  }

  verifyResetPasswordPage(title) {
    cy.url().should('include', '/requestPasswordResetCode')
    this.resetPasswordTitle().should('have.text', title)
  }
}

export default new LoginPage()