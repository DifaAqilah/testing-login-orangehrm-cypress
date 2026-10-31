import loginPage from './pages/LoginPage'
import recruitmentPage from './pages/RecruitmentPage'
import { loginData } from './data/loginData'
import { recruitmentData } from './data/recruitmentData'

describe('Final Project - Menu Recruitment OrangeHRM', () => {

  // Login dulu sebelum setiap test
  beforeEach(() => {
    loginPage.visit(loginData.url)
    loginPage.login(loginData.valid.username, loginData.valid.password)
    loginPage.verifyLoginSuccess()
  })

  it('TC-REC-001 - Membuka menu Recruitment', () => {
    recruitmentPage.interceptCandidates()

    recruitmentPage.openMenu()

    recruitmentPage.verifyRecruitmentPage(recruitmentData.pageTitle, recruitmentData.urlPart.candidates)
    recruitmentPage.verifyCandidatesResponse()
  })

  it('TC-REC-002 - Form filter kandidat tampil lengkap', () => {
    recruitmentPage.interceptCandidates()

    recruitmentPage.openMenu()

    recruitmentPage.verifyCandidatesResponse()
    recruitmentPage.verifyFilterLabels(recruitmentData.labels)
  })

  it('TC-REC-003 - Search kandidat tanpa filter', () => {
    recruitmentPage.interceptCandidates()
    recruitmentPage.openMenu()
    recruitmentPage.verifyCandidatesResponse()

    recruitmentPage.clickSearch()

    recruitmentPage.verifyCandidatesResponse()
    recruitmentPage.verifyRecordsFound()
  })

  it('TC-REC-004 - Membuka tab Vacancies', () => {
    recruitmentPage.openMenu()
    recruitmentPage.interceptVacancies()

    recruitmentPage.clickVacanciesTab()

    recruitmentPage.verifyRecruitmentPage(recruitmentData.pageTitle, recruitmentData.urlPart.vacancies)
    recruitmentPage.verifyVacanciesResponse()
  })

  it('TC-REC-005 - Filter kandidat berdasarkan Status', () => {
    recruitmentPage.interceptCandidates()
    recruitmentPage.openMenu()
    recruitmentPage.verifyCandidatesResponse()

    recruitmentPage.selectFilter(3) // dropdown ke-4 = Status
    recruitmentPage.clickSearch()

    recruitmentPage.verifyStatusFilterRequest()
  })

  it('TC-REC-006 - Tambah kandidat dengan data wajib kosong', () => {
    recruitmentPage.interceptSaveCandidate()
    recruitmentPage.openMenu()

    recruitmentPage.clickAdd()
    recruitmentPage.verifyAddCandidatePage(recruitmentData.urlPart.addCandidate)
    recruitmentPage.clickSave()

    recruitmentPage.verifyRequiredMessage(3, recruitmentData.message.required)
    recruitmentPage.verifyNoSaveRequest()
  })

  it('TC-REC-007 - Tambah kandidat dengan format email tidak valid', () => {
    recruitmentPage.interceptSaveCandidate()
    recruitmentPage.openMenu()

    recruitmentPage.clickAdd()
    recruitmentPage.verifyAddCandidatePage(recruitmentData.urlPart.addCandidate)
    recruitmentPage.fillCandidate(
      recruitmentData.candidate.firstName,
      recruitmentData.candidate.lastName,
      recruitmentData.candidate.invalidEmail
    )
    recruitmentPage.clickSave()

    recruitmentPage.verifyInvalidEmailMessage(recruitmentData.message.invalidEmail)
    recruitmentPage.verifyNoSaveRequest()
  })

  it('TC-REC-008 - Tambah kandidat dengan data valid', () => {
    recruitmentPage.interceptSaveCandidate()
    recruitmentPage.openMenu()

    recruitmentPage.clickAdd()
    recruitmentPage.verifyAddCandidatePage(recruitmentData.urlPart.addCandidate)
    recruitmentPage.fillCandidate(
      recruitmentData.candidate.firstName,
      recruitmentData.candidate.lastName,
      recruitmentData.candidate.email
    )
    recruitmentPage.clickSave()

    recruitmentPage.verifySaveSuccess(recruitmentData.candidate.firstName)
    recruitmentPage.verifyToastMessage(recruitmentData.message.success)
  })

})