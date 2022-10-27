/// <reference types="cypress" />
describe('Тестируем телефонный справочник', () => {
    it('Открыть модальное окно', () => {
      cy.visit('http://127.0.0.1:5500/');
      cy.get('.js-add').click();
      cy.get('.form-owerlay').should('have.class', 'is-visible');
    });
    it('Добавить контакт', () => {

    });
})