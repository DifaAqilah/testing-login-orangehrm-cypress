import loginPage from './pages/loginPage'
import { loginData } from './data/loginData'

describe('Tugas 17 - Login OrangeHRM dengan POM', () => {

  beforeEach(() => {
    loginPage.visit(loginData.url)
  })

  it('TC-LGN-001 - Login dengan username dan password valid', () => {
    loginPage.login(loginData.valid.username, loginData.valid.password)
    loginPage.verifyLoginSuccess()
  })

  it('TC-LGN-002 - Login dengan password tidak valid', () => {
    loginPage.login(loginData.valid.username, loginData.invalid.password)
    loginPage.verifyAlertMessage(loginData.message.invalidCredentials)
    loginPage.verifyStillOnLoginPage()
  })

  it('TC-LGN-003 - Login dengan username tidak valid', () => {
    loginPage.login(loginData.invalid.username, loginData.valid.password)
    loginPage.verifyAlertMessage(loginData.message.invalidCredentials)
    loginPage.verifyStillOnLoginPage()
  })

  it('TC-LGN-004 - Login dengan username dan password kosong', () => {
    loginPage.clickLogin()
    loginPage.verifyRequiredMessage(2)
    loginPage.verifyStillOnLoginPage()
  })

  it('TC-LGN-007 - Username case-insensitive (huruf kecil)', () => {
    loginPage.login(loginData.invalid.usernameKecil, loginData.valid.password)
    loginPage.verifyLoginSuccess()
  })

  it('TC-LGN-008 - Password case-sensitive', () => {
    loginPage.login(loginData.valid.username, loginData.invalid.passwordKapital)
    loginPage.verifyAlertMessage(loginData.message.invalidCredentials)
    loginPage.verifyStillOnLoginPage()
  })

  it('TC-LGN-009 - Password disamarkan (masked)', () => {
    loginPage.inputPassword(loginData.valid.password)
    loginPage.verifyPasswordMasked()
  })

  it('TC-LGN-010 - Input SQL injection pada username', () => {
    loginPage.login(loginData.invalid.sqlInjection, loginData.invalid.passwordAcak)
    loginPage.verifyAlertMessage(loginData.message.invalidCredentials)
    loginPage.verifyStillOnLoginPage()
  })

  it('TC-LGN-011 - Link Forgot your password', () => {
    loginPage.clickForgotPassword()
    loginPage.verifyResetPasswordPage(loginData.message.resetPassword)
  })

  it('TC-LGN-012 - Login menggunakan tombol Enter', () => {
    loginPage.loginWithEnter(loginData.valid.username, loginData.valid.password)
    loginPage.verifyLoginSuccess()
  })

})