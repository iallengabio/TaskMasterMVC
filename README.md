# TaskMasterMVC

Este projeto foi desenvolvido como um recurso pedagógico para demonstrar aos alunos do curso de Análise e Desenvolvimento de Sistemas (ADS) a importância de uma boa arquitetura de software e a aplicação de padrões de design como SOLID.

## Descrição

O projeto consiste em uma aplicação web de controle de tarefas (to-do list) com autenticação de usuários. O sistema permite que os usuários façam login com email e senha ou utilizem a autenticação do Google. Após o login, os usuários podem criar novas tarefas, marcar tarefas como concluídas e excluir tarefas existentes.

A arquitetura do projeto segue o padrão MVC (Model-View-Controller), e o build é gerenciado pelo Parcel, um bundler simples e eficiente. Nesta primeira versão, a camada de View é construída utilizando apenas HTML, CSS e TypeScript. Nas versões subsequentes, serão criadas branches onde a camada de View será substituída por frameworks modernos como Vue, React e Angular, mantendo os mesmos controllers e models, para demonstrar a flexibilidade de uma arquitetura bem estruturada.

## Tecnologias Utilizadas

- HTML, CSS e TypeScript: Para construção da interface do usuário e lógica de negócios.
- Firebase: Backend as a Service (BaaS) utilizado para autenticação e armazenamento de dados.
- Parcel: Ferramenta de build utilizada para empacotamento do projeto.
- Arquitetura MVC: Separação clara das responsabilidades em Models, Views e Controllers.
- Padrões SOLID: Aplicação de princípios de design que visam melhorar a qualidade e manutenção do código.
- Testes de Unidade: Garantia de que cada componente do sistema funcione como esperado.

## Objetivo Educacional

Este projeto tem como objetivo demonstrar na prática o poder de uma boa arquitetura de software, o uso de padrões de design e as melhores práticas de programação. Ao manter a camada de lógica (Controllers e Models) intacta ao longo das diferentes versões do projeto, os alunos poderão ver como uma boa separação de responsabilidades facilita a integração com diferentes tecnologias de front-end.

Além disso, a aplicação de princípios SOLID e a realização de testes de unidade garantem que o código seja sustentável, escalável e de fácil manutenção.
