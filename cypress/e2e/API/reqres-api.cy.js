describe('Tugas - API Automation ReqRes', () => {

  const baseUrl = 'https://reqres.in/api'
  const apiKey = "pro_9909121bdb8f146982f0abf7aff2af5c318da280148363a1a5b49c4cc79ebeba"
  const headers = { 'x-api-key': apiKey }

  it('TC-REQ-001 - GET list users halaman 2', () => {
    cy.request({ method: 'GET', url: `${baseUrl}/users?page=2`, headers }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.page).to.eq(2)
      expect(response.body.per_page).to.eq(6)
      expect(response.body.data).to.be.an('array').and.have.length(6)
    })
  })

  it('TC-REQ-002 - GET single user id 2', () => {
    cy.request({ method: 'GET', url: `${baseUrl}/users/2`, headers }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.id).to.eq(2)
      expect(response.body.data.first_name).to.eq('Janet')
      expect(response.body.data.email).to.include('@reqres.in')
    })
  })

  it('TC-REQ-003 - GET single user tidak ditemukan (negative)', () => {
    cy.request({ method: 'GET', url: `${baseUrl}/users/23`, headers, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.deep.eq({})
    })
  })

  it('TC-REQ-004 - GET list resource (unknown)', () => {
    cy.request({ method: 'GET', url: `${baseUrl}/unknown`, headers }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.total).to.eq(12)
      expect(response.body.data).to.be.an('array').and.not.be.empty
    })
  })

  it('TC-REQ-005 - GET single resource id 2', () => {
    cy.request({ method: 'GET', url: `${baseUrl}/unknown/2`, headers }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.id).to.eq(2)
      expect(response.body.data.name).to.eq('fuchsia rose')
    })
  })

  it('TC-REQ-006 - POST membuat user baru', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers,
      body: { name: 'morpheus', job: 'leader' },
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.name).to.eq('morpheus')
      expect(response.body.job).to.eq('leader')
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('createdAt')
    })
  })

  it('TC-REQ-007 - PUT mengubah user', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      headers,
      body: { name: 'morpheus', job: 'zion resident' },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq('morpheus')
      expect(response.body.job).to.eq('zion resident')
      expect(response.body).to.have.property('updatedAt')
    })
  })

  it('TC-REQ-008 - PATCH mengubah sebagian data user', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users/2`,
      headers,
      body: { job: 'teacher' },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.job).to.eq('teacher')
      expect(response.body).to.have.property('updatedAt')
    })
  })

  it('TC-REQ-009 - DELETE user', () => {
    cy.request({ method: 'DELETE', url: `${baseUrl}/users/2`, headers }).then((response) => {
      expect(response.status).to.eq(204)
      expect(response.body).to.be.empty
    })
  })

  it('TC-REQ-010 - POST register berhasil', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers,
      body: { email: 'eve.holt@reqres.in', password: 'pistol' },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(4)
      expect(response.body.token).to.be.a('string').and.not.be.empty
    })
  })

  it('TC-REQ-011 - POST register tanpa password (negative)', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers,
      body: { email: 'sydney@fife' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Missing password')
    })
  })

  it('TC-REQ-012 - POST login berhasil', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers,
      body: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.token).to.be.a('string').and.not.be.empty
    })
  })

})