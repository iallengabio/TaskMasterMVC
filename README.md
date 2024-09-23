# TaskMasterMVP

Este projeto foi desenvolvido como um recurso pedagógico para demonstrar aos alunos do curso de Análise e Desenvolvimento de Sistemas (ADS) a importância de uma boa arquitetura de software e a aplicação de padrões de design como SOLID.

## Descrição

O projeto consiste em uma aplicação web de controle de tarefas (to-do list) com autenticação de usuários. O sistema permite que os usuários façam login com email e senha ou utilizem a autenticação do Google. Após o login, os usuários podem criar novas tarefas, marcar tarefas como concluídas e excluir tarefas existentes.

A arquitetura do projeto segue o padrão MVP (Model-View-Presenter), e o build é gerenciado pelo Parcel, um bundler simples e eficiente. A camada de View já está implementada de duas formas: usando webkit padrão com HTML, CSS e TypeScript, e utilizando o framework React, demonstrando a flexibilidade do padrão MVP em manter a lógica de negócios separada da interface do usuário.

Todo o código, incluindo ambas as implementações da View, está mantido no branch `main`.

## Tecnologias Utilizadas

- **HTML, CSS e TypeScript**: Para a construção da interface do usuário e lógica de negócios.
- **React**: Framework JavaScript para criação da interface do usuário em uma das implementações da View.
- **Firebase**: Backend as a Service (BaaS) utilizado para autenticação e armazenamento de dados.
- **Parcel**: Ferramenta de build utilizada para empacotamento do projeto.
- **Arquitetura MVP**: Separação clara das responsabilidades em Models, Views e Presenters.
- **Padrões SOLID**: Aplicação de princípios de design que visam melhorar a qualidade e manutenção do código.
- **Testes de Unidade**: Garantia de que cada componente do sistema funcione como esperado.

## Objetivo Educacional

Este projeto tem como objetivo demonstrar na prática o poder de uma boa arquitetura de software, o uso de padrões de design e as melhores práticas de programação. Ao manter a camada de lógica (Presenters e Models) intacta, os alunos podem observar como uma boa separação de responsabilidades facilita a integração com diferentes tecnologias de front-end, como a implementação da View com webkit padrão e React.

Além disso, a aplicação de princípios SOLID e a realização de testes de unidade garantem que o código seja sustentável, escalável e de fácil manutenção.
