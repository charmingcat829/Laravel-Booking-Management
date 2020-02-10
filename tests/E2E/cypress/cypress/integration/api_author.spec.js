import Constants from '../support/constant'

describe('Author API Test', function() {
  it('create', function() {
    const baseURL = Constants.URL
    const statusCode = 201
    const id = new Date().getTime()
    const name = `Test Name ${id}`

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/author`,
      body: {
        'name': name
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.eq(statusCode)
      expect(response.body).to.have.property('status', statusCode)
      expect(response.body).to.have.property('success', true)
      expect(response.body).to.have.property('errors', null)
      expect(response.body).have.property('message')
      expect(response.body).have.property('data')
      expect(response.body.data).to.have.property('name', name)
    })
  })

  it('create-fail-1', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const name = ''

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/author`,
      failOnStatusCode: false,
      body: {
        'name': name
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.eq(statusCode)
      expect(response.body).to.have.property('status', statusCode)
      expect(response.body).to.have.property('success', false)
    })
  })

  it('create-fail-2', function() {
    const baseURL = Constants.URL
    const statusCode = 400
    const name = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/author`,
      failOnStatusCode: false,
      body: {
        'name': name
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.eq(statusCode)
      expect(response.body).to.have.property('status', statusCode)
      expect(response.body).to.have.property('success', false)
    })
  })

  it('list', function() {
    const baseURL = Constants.URL
    const statusCode = 200

    cy.request({
      method: 'GET',
      url: `${baseURL}/api/v1/author`
    }).then(function(response){
      expect(response.status).to.eq(statusCode)
      expect(response.body).to.have.property('status', statusCode)
      expect(response.body).to.have.property('success', true)
      expect(response.body).to.have.property('errors', null)
    })
  })
})