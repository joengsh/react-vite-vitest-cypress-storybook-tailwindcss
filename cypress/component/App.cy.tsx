import React from 'react';
import App from '../../src/App';

describe('App', () => {
  it('playground', () => {
    cy.mount(<App />);
    cy.get('.App').should('be.visible');
  });
});
