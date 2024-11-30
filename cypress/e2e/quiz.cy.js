describe('Tech Quiz E2E Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('starts the quiz and displays questions', () => {
      cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
      cy.get('button').contains('Start Quiz').click();
      cy.wait('@getQuestions');
      cy.get('h2').should('contain', 'What is the output of 2 ** 3?');
    });
  
    it('completes the quiz and displays the score', () => {
      cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
      cy.get('button').contains('Start Quiz').click();
      cy.wait('@getQuestions');
      cy.get('button').contains('1').click(); // Correct answer
      cy.get('button').contains('1').click(); // Correct answer
      cy.get('h2').should('contain', 'Quiz Completed');
      cy.get('.alert-success').should('contain', 'Your score: 2/2');
    });
  
    it('allows starting a new quiz after completion', () => {
      cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
      cy.get('button').contains('Start Quiz').click();
      cy.wait('@getQuestions');
      cy.get('button').contains('1').click();
      cy.get('button').contains('1').click();
      cy.get('button').contains('Take New Quiz').click();
      cy.visit('/');
      cy.get('button').contains('Start Quiz').should('be.visible');
    });
  });
  