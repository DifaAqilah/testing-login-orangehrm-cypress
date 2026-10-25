describe('Fitur Login OrangeHRM', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible')
  })

  it('TC-LGN-001 - Login menggunakan username dan password valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard/index')
    cy.get('.oxd-topbar-header-breadcrumb-module').should('contain.text', 'Dashboard')
  })

  it('TC-LGN-002 - Login menggunakan password tidak valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
    cy.url().should('include', '/auth/login')
  })

  it('TC-LGN-003 - Login menggunakan username tidak valid', () => {
    cy.get('input[name="username"]').type('Adminn')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
    cy.url().should('include', '/auth/login')
  })

  it('TC-LGN-004 - Login dengan username dan password kosong', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message').should('have.length', 2)
    cy.get('.oxd-input-field-error-message').each(($msg) => {
      cy.wrap($msg).should('have.text', 'Required')
    })
    cy.url().should('include', '/auth/login')
  })

  it('TC-LGN-005 - Login dengan username kosong', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message').should('have.length', 1)
    cy.get('.oxd-input-field-error-message').should('have.text', 'Required')
    cy.url().should('include', '/auth/login')
  })

  it('TC-LGN-006 - Login dengan password kosong', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message').should('have.length', 1)
    cy.get('.oxd-input-field-error-message').should('have.text', 'Required')
    cy.url().should('include', '/auth/login')
  })

  it('TC-LGN-007 - Username bersifat case-insensitive (huruf kecil)', () => {
    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard/index')
    cy.get('.oxd-topbar-header-breadcrumb-module').should('contain.text', 'Dashboard')
  })

  it('TC-LGN-008 - Password bersifat case-sensitive', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('ADMIN123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
    cy.url().should('include', '/auth/login')
  })

  it('TC-LGN-009 - Password disamarkan (masked)', () => {
    cy.get('input[name="password"]').type('admin123')

    cy.get('input[name="password"]').should('have.attr', 'type', 'password')
    cy.get('input[name="password"]').should('have.value', 'admin123')
  })

  it('TC-LGN-010 - Input SQL injection pada username', () => {
    cy.get('input[name="username"]').type("' OR '1'='1")
    cy.get('input[name="password"]').type('x')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
    cy.url().should('include', '/auth/login')
  })

  it('TC-LGN-011 - Link Forgot your password?', () => {
    cy.get('.orangehrm-login-forgot-header').click()

    cy.url().should('include', '/requestPasswordResetCode')
    cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password')
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').should('be.visible')

    cy.contains('button', 'Cancel').click()
    cy.url().should('include', '/auth/login')
  })

    it('TC-LGN-012 - Login menggunakan tombol Enter', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123{enter}')

    cy.url().should('include', '/dashboard/index')
    cy.get('.oxd-topbar-header-breadcrumb-module').should('contain.text', 'Dashboard')

  })

})