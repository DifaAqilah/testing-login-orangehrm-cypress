import loginPage from './pages/LoginPage'
import directoryPage from './pages/DirectoryPage'
import { loginData } from './data/loginData'
import { directoryData } from './data/directoryData'

describe('Final Project - Menu Directory OrangeHRM', () => {

  // Login dulu, lalu pasang intercept dan buka menu Directory
  beforeEach(() => {
    loginPage.visit(loginData.url)
    loginPage.login(loginData.valid.username, loginData.valid.password)
    loginPage.verifyLoginSuccess()

    directoryPage.interceptEmployees()
    directoryPage.openMenu()
  })

  it('TC-DIR-001 - Membuka menu Directory', () => {
    directoryPage.verifyDirectoryPage(directoryData.pageTitle, directoryData.urlPart)
    directoryPage.verifyEmployeesResponse()
  })

  it('TC-DIR-002 - Form filter Directory tampil lengkap', () => {
    directoryPage.verifyEmployeesResponse()
    directoryPage.verifyFilterLabels(directoryData.labels)
  })

  it('TC-DIR-003 - Search tanpa filter menampilkan daftar karyawan', () => {
    directoryPage.verifyEmployeesResponse()

    directoryPage.clickSearch()

    directoryPage.verifyEmployeesResponse()
    directoryPage.verifyCardsDisplayed()
    directoryPage.verifyRecordsFound()
  })

  it('TC-DIR-004 - Search berdasarkan nama karyawan', () => {
    directoryPage.verifyEmployeesResponse()

    directoryPage.typeEmployeeName(directoryData.search.keyword)
    directoryPage.selectFirstAutocompleteOption()
    directoryPage.clickSearch()

    directoryPage.verifyEmployeesResponse()
    directoryPage.verifyCardsDisplayed()
  })

  it('TC-DIR-005 - Search dengan nama karyawan tidak valid', () => {
    directoryPage.verifyEmployeesResponse()

    directoryPage.typeEmployeeName(directoryData.search.invalidName)
    directoryPage.clickSearch()

    directoryPage.verifyInvalidMessage(directoryData.message.invalid)
  })

  it('TC-DIR-006 - Tombol Reset mengosongkan kolom nama', () => {
    directoryPage.verifyEmployeesResponse()

    directoryPage.typeEmployeeName(directoryData.search.keyword)
    directoryPage.selectFirstAutocompleteOption()
    directoryPage.clickReset()

    directoryPage.verifyEmployeeNameEmpty()
  })

  it('TC-DIR-007 - Filter berdasarkan Job Title', () => {
    directoryPage.verifyEmployeesResponse()

    directoryPage.selectFilter(0)
    directoryPage.verifyFilterSelected(0)
    directoryPage.clickSearch()

    directoryPage.verifyFilterRequest(directoryData.filterParam.jobTitle)
  })

  it('TC-DIR-008 - Filter berdasarkan Location', () => {
    directoryPage.verifyEmployeesResponse()

    directoryPage.selectFilter(1)
    directoryPage.verifyFilterSelected(1)
    directoryPage.clickSearch()

    directoryPage.verifyFilterRequest(directoryData.filterParam.location)
  })

})