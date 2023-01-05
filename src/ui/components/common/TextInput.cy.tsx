import React from 'react'
import TextInput from './TextInput'

describe('<TextInput />', () => {
  it('Renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TextInput />)
    cy.get(`[data-cy="input-text"]`).should('exist')
  })

  it('Types `hello world!`', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TextInput />)
    cy.get(`[data-cy="input-text"]`).as('input').should('exist')
    cy.get(`@input`).type(`hello world!`)
  })
})