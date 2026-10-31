class DirectoryPage {

  // ===== Locator =====
  menuDirectory() {
    return cy.contains('a.oxd-main-menu-item', 'Directory')
  }

  pageTitle() {
    return cy.get('.oxd-topbar-header-breadcrumb-module')
  }

  employeeNameInput() {
    return cy.get('input[placeholder="Type for hints..."]')
  }

  autocompleteOption() {
    return cy.get('.oxd-autocomplete-option', { timeout: 10000 })
  }

  dropdown(index) {
    return cy.get('.oxd-select-text').eq(index)
  }

  dropdownOption(index) {
    return cy.get('.oxd-select-option').eq(index)
  }

  selectedText(index) {
    return cy.get('.oxd-select-text-input').eq(index)
  }

  searchButton() {
    return cy.contains('button', 'Search')
  }

  resetButton() {
    return cy.contains('button', 'Reset')
  }

  employeeCards() {
    return cy.get('.orangehrm-directory-card', { timeout: 15000 })
  }

  errorMessage() {
    return cy.get('.oxd-input-field-error-message')
  }

  // ===== Intercept =====
  interceptEmployees() {
    cy.intercept('GET', '**/api/v2/directory/employees*').as('employees')
  }

  // ===== Action =====
  openMenu() {
    this.menuDirectory().click()
  }

  typeEmployeeName(text) {
    this.employeeNameInput().type(text)
  }

  selectFirstAutocompleteOption() {
    this.autocompleteOption().first().click()
  }

  // index 0 = Job Title, index 1 = Location. Opsi 0 adalah "-- Select --"
  selectFilter(dropdownIndex) {
    this.dropdown(dropdownIndex).click()
    this.dropdownOption(1).click()
  }

  clickSearch() {
    this.searchButton().click()
  }

  clickReset() {
    this.resetButton().click()
  }

  // ===== Assertion =====
  verifyDirectoryPage(title, urlPart) {
    cy.url().should('include', urlPart)
    this.pageTitle().should('contain.text', title)
  }

  verifyFilterLabels(labels) {
    labels.forEach((label) => {
      cy.contains('label', label).should('be.visible')
    })
  }

  verifyEmployeesResponse() {
    cy.wait('@employees').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body).to.have.property('data')
    })
  }

  verifyFilterRequest(param) {
    cy.wait('@employees').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.request.url).to.include(param)
    })
  }

  verifyCardsDisplayed() {
    this.employeeCards().should('have.length.greaterThan', 0)
  }

  verifyRecordsFound() {
    cy.contains('Records Found').should('be.visible')
  }

  verifyInvalidMessage(message) {
    this.errorMessage().should('contain.text', message)
  }

  verifyEmployeeNameEmpty() {
    this.employeeNameInput().should('have.value', '')
  }

  verifyFilterSelected(index) {
    this.selectedText(index).should('not.have.text', '-- Select --')
  }
}

export default new DirectoryPage()