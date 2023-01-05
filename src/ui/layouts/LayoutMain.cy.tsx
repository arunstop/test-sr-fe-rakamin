import React from 'react'
import LayoutMain from './LayoutMain'

describe('<LayoutMain />', () => {
  it('Renders correctly', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LayoutMain children={'children'} />)
    cy.get(`[data-cy="layout-main"]`)
  })

  it('Renders header', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LayoutMain children={<></>} />)
    cy.get(`[data-cy="layout-main"]`).should('contain.html','nav')
  })

  it('Renders children', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LayoutMain children={'children'} />)
    cy.get(`[data-cy="layout-main"]`).should('contain.text','children')
  })
})