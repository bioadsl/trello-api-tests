Feature: Gerenciamento de Cards

  Scenario: Cadastrar um card
    Given que tenho um board e uma lista para criar cards
    When envio uma requisição para criar um card
    Then o card deve ser criado com sucesso

  Scenario: Excluir um card
    Given que tenho um card existente para exclusão
    When envio uma requisição para excluí-lo
    Then o card deve ser removido com sucesso
