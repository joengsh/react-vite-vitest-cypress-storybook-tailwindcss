import React from 'react';
import App from '../../src/App';

describe('App', () => {
  it('playground', () => {
    cy.viewport(1280, 720);
    cy.mount(<App />);
    cy.get('.App').should('be.visible');
  });
});
