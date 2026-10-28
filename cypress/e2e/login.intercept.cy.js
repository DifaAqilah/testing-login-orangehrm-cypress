describe('Tugas 16 - Intercept pada Fitur Login OrangeHRM', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible')
  })

  it('TC-LGN-001 - Login valid: server mengarahkan ke dashboard', () => {
    cy.intercept('POST', '**/auth/validate').as('validateLogin')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@validateLogin').then((interception) => {
      expect(interception.response.statusCode).to.eq(302)
      expect(interception.response.headers.location).to.include('/dashboard/index')
    })
    cy.url().should('include', '/dashboard/index')
  })

  it('TC-LGN-002 - Password salah: server mengarahkan kembali ke login', () => {
    cy.intercept('POST', '**/auth/validate').as('validateGagal')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('123')
    cy.get('button[type="submit"]').click()

    cy.wait('@validateGagal').then((interception) => {
      expect(interception.response.statusCode).to.eq(302)
      expect(interception.response.headers.location).to.include('/auth/login')
    })
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
  })

  it('TC-LGN-003 - Username salah: halaman login dimuat ulang', () => {
    cy.intercept('GET', '**/auth/login').as('halamanLogin')

    cy.get('input[name="username"]').type('Adminn')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@halamanLogin').its('response.statusCode').should('eq', 200)
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
  })

  it('TC-LGN-004 - Field kosong: tidak ada request ke server', () => {
    cy.intercept('POST', '**/auth/validate').as('validateKosong')

    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message').should('have.length', 2)
    cy.get('@validateKosong.all').should('have.length', 0)
  })

  it('TC-LGN-007 - Username huruf kecil: API action-summary dipanggil', () => {
    cy.intercept('GET', '**/dashboard/employees/action-summary*').as('actionSummary')

    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@actionSummary', { timeout: 20000 }).its('response.statusCode').should('be.oneOf', [200, 304])
  })

  it('TC-LGN-008 - Password huruf besar: request dikirim dengan metode form POST', () => {
    cy.intercept('POST', '**/auth/validate').as('validateKapital')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('ADMIN123')
    cy.get('button[type="submit"]').click()

    cy.wait('@validateKapital').then((interception) => {
      expect(interception.request.headers['content-type']).to.include('application/x-www-form-urlencoded')
      expect(interception.response.statusCode).to.eq(302)
    })
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
  })

  it('TC-LGN-010 - SQL injection: server tidak error (status bukan 5xx)', () => {
    cy.intercept('POST', '**/auth/validate').as('validateSql')

    cy.get('input[name="username"]').type("' OR '1'='1")
    cy.get('input[name="password"]').type('x')
    cy.get('button[type="submit"]').click()

    cy.wait('@validateSql').its('response.statusCode').should('be.lessThan', 500)
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
  })

  it('TC-LGN-011 - Forgot password: halaman reset password dimuat', () => {
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('halamanReset')

    cy.get('.orangehrm-login-forgot-header').click()

    cy.wait('@halamanReset').its('response.statusCode').should('eq', 200)
    cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password')
  })

  it('TC-LGN-012 - Login dengan Enter: API shortcuts dipanggil', () => {
    cy.intercept('GET', '**/dashboard/shortcuts*').as('shortcuts')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123{enter}')

    cy.wait('@shortcuts', { timeout: 20000 }).its('response.statusCode').should('be.oneOf', [200, 304])
  })

})