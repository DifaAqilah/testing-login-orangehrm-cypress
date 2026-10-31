class RecruitmentPage {

  // ===== Locator =====
  menuRecruitment() {
    return cy.contains('a.oxd-main-menu-item', 'Recruitment')
  }

  pageTitle() {
    return cy.get('.oxd-topbar-header-breadcrumb-module')
  }

  vacanciesTab() {
    return cy.contains('.oxd-topbar-body-nav-tab-item', 'Vacancies')
  }

  addButton() {
    return cy.contains('button', 'Add')
  }

  searchButton() {
    return cy.contains('button', 'Search')
  }

  dropdown(index) {
    return cy.get('.oxd-select-text').eq(index)
  }

  dropdownOption(index) {
    return cy.get('.oxd-select-option').eq(index)
  }

  firstNameInput() {
    return cy.get('input[name="firstName"]')
  }

  lastNameInput() {
    return cy.get('input[name="lastName"]')
  }

  emailInput() {
    return cy.contains('label', 'Email').parents('.oxd-input-group').find('input')
  }

  saveButton() {
    return cy.get('button[type="submit"]')
  }

  errorMessage() {
    return cy.get('.oxd-input-field-error-message')
  }

  toast() {
    return cy.get('.oxd-toast')
  }

  // ===== Intercept =====
  interceptCandidates() {
    cy.intercept('GET', '**/api/v2/recruitment/candidates*').as('candidates')
  }

  interceptVacancies() {
    cy.intercept('GET', '**/api/v2/recruitment/vacancies*').as('vacancies')
  }

  interceptSaveCandidate() {
    cy.intercept('POST', '**/api/v2/recruitment/candidates').as('saveCandidate')
  }

  // ===== Action =====
  openMenu() {
    this.menuRecruitment().click()
  }

  clickVacanciesTab() {
    this.vacanciesTab().click()
  }

  clickAdd() {
    this.addButton().click()
  }

  clickSearch() {
    this.searchButton().click()
  }

  // Opsi 0 adalah "-- Select --", jadi pilih opsi ke-1
  selectFilter(dropdownIndex) {
    this.dropdown(dropdownIndex).click()
    this.dropdownOption(1).click()
  }

  fillCandidate(firstName, lastName, email) {
    this.firstNameInput().type(firstName)
    this.lastNameInput().type(lastName)
    this.emailInput().type(email)
  }

  clickSave() {
    this.saveButton().click()
  }

  // ===== Assertion =====
  verifyRecruitmentPage(title, urlPart) {
    cy.url().should('include', urlPart)
    this.pageTitle().should('contain.text', title)
  }

  verifyCandidatesResponse() {
    cy.wait('@candidates').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body).to.have.property('data')
    })
  }

  verifyStatusFilterRequest() {
    cy.wait('@candidates').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.request.url).to.match(/status/i)
    })
  }

  verifyVacanciesResponse() {
    cy.wait('@vacancies').its('response.statusCode').should('eq', 200)
  }

  verifyFilterLabels(labels) {
    labels.forEach((label) => {
      cy.contains('label', label).should('be.visible')
    })
  }

  verifyRecordsFound() {
    cy.contains('Records Found').should('be.visible')
  }

  verifyAddCandidatePage(urlPart) {
    cy.url().should('include', urlPart)
    cy.contains('h6', 'Add Candidate').should('be.visible')
  }

  verifyRequiredMessage(jumlah, message) {
    this.errorMessage().should('have.length', jumlah)
    this.errorMessage().first().should('have.text', message)
  }

  verifyInvalidEmailMessage(message) {
    this.errorMessage().should('contain.text', message)
  }

  verifyNoSaveRequest() {
    cy.get('@saveCandidate.all').should('have.length', 0)
  }

  verifySaveSuccess(firstName) {
    cy.wait('@saveCandidate').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body.data.firstName).to.eq(firstName)
    })
  }

  verifyToastMessage(message) {
    this.toast().should('contain.text', message)
  }
}

export default new RecruitmentPage()