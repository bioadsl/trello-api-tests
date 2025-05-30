Feature: Gerenciamento de Boards

  Scenario: Cadastrar um board
    Given que desejo criar um novo board
    When envio uma requisição para criar o board
    Then o board deve ser criado com sucesso

  Scenario: Excluir um board
    Given que tenho um board existente
    When envio uma requisição para excluí-lo
    Then o board deve ser removido com sucesso
