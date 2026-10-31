import loginPage from './pages/LoginPage'
import { loginData } from './data/loginData'

describe('Final Project - Fitur Login OrangeHRM', () => {

  beforeEach(() => {
    loginPage.visit(loginData.url)
  })

  it('TC-LGN-001 - Login dengan username dan password valid', () => {
    loginPage.interceptValidate()

    loginPage.login(loginData.valid.username, loginData.valid.password)

    loginPage.verifyValidateRedirect(loginData.urlPart.dashboard)
    loginPage.verifyLoginSuccess()
  })

  it('TC-LGN-002 - Login dengan password tidak valid', () => {
    loginPage.interceptValidate()

    loginPage.login(loginData.valid.username, loginData.invalid.password)

    loginPage.verifyValidateRedirect(loginData.urlPart.login)
    loginPage.verifyAlertMessage(loginData.message.invalidCredentials)
    loginPage.verifyStillOnLoginPage()
  })

  it('TC-LGN-003 - Login dengan username tidak valid', () => {
    loginPage.interceptValidate()

    loginPage.login(loginData.invalid.username, loginData.valid.password)

    loginPage.verifyValidateRedirect(loginData.urlPart.login)
    loginPage.verifyAlertMessage(loginData.message.invalidCredentials)
    loginPage.verifyStillOnLoginPage()
  })

  it('TC-LGN-004 - Login dengan username dan password kosong', () => {
    loginPage.interceptValidate()

    loginPage.clickLogin()

    loginPage.verifyRequiredMessage(2, loginData.message.required)
    loginPage.verifyNoValidateRequest()
    loginPage.verifyStillOnLoginPage()
  })

  it('TC-LGN-005 - Login dengan username kosong', () => {
    loginPage.interceptValidate()

    loginPage.inputPassword(loginData.valid.password)
    loginPage.clickLogin()

    loginPage.verifyRequiredMessage(1, loginData.message.required)
    loginPage.verifyNoValidateRequest()
    loginPage.verifyStillOnLoginPage()
  })

  it('TC-LGN-006 - Login dengan password kosong', () => {
    loginPage.interceptValidate()

    loginPage.inputUsername(loginData.valid.username)
    loginPage.clickLogin()

    loginPage.verifyRequiredMessage(1, loginData.message.required)
    loginPage.verifyNoValidateRequest()
    loginPage.verifyStillOnLoginPage()
  })

  it('TC-LGN-007 - Link Forgot your password', () => {
    loginPage.interceptResetPage()

    loginPage.clickForgotPassword()

    loginPage.verifyResetPageLoaded()
    loginPage.verifyResetPasswordPage(loginData.message.resetPassword)
  })

  it('TC-LGN-008 - Login menggunakan tombol Enter', () => {
    loginPage.interceptShortcuts()

    loginPage.loginWithEnter(loginData.valid.username, loginData.valid.password)

    loginPage.verifyShortcutsLoaded()
    loginPage.verifyLoginSuccess()
  })

})