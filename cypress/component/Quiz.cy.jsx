import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component Tests', () => {
  it('renders the Start Quiz button initially', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('starts the quiz and shows the first question', () => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('h2').should('contain', 'What is the output of 2 ** 3?');
  });

  it('records the score and shows the result after completing', () => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('button').contains('1').click(); // Select the correct answer
    cy.get('button').contains('1').click(); // Select the correct answer
    cy.get('h2').should('contain', 'Quiz Completed');
    cy.get('.alert-success').should('contain', 'Your score: 2/2');
  });
});
