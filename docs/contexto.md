# Introdução

Nos últimos anos, o setor de serviços de autocuidado e beleza como barbearias, cabeleireiros, esteticistas e outros tem crescido significativamente. Este projeto se propõe a oferecer uma ferramenta de auxílio a estes empreendedores e empreendedoras, particularmente no que diz respeito à gestão de seus horários de atendimento.

## Problema
A prestação de serviços de autocuidado é vista como uma oportunidade, principalmente por pessoas de baixa renda, uma vez que se trata de um mercado em expansão, com poucas barreiras de entrada e um investimento inicial relativamente baixo. Além disso, por se tratarem de serviços invariavelmente prestados de forma presencial e que possuem um potencial altamente restrito de ganhos de economia de escala, são pouco suscetíveis à monopolização e centralização, permitindo que pequenos prestadores construam e fidelizem suas clientelas regionais.

No entanto, esses microempreendedores se deparam com desafios substanciais, sobretudo na gestão de seus negócios. Nesse contexto, um dos desafios é o acúmulo de tarefas, dentre as quais se encontra a gestão de seus horários de disponibilidade e da marcação de horários com seus clientes.


> **Links Úteis**:
> - [Objetivos, Problema de pesquisa e Justificativa](https://medium.com/@versioparole/objetivos-problema-de-pesquisa-e-justificativa-c98c8233b9c3)
> - [Matriz Certezas, Suposições e Dúvidas](https://medium.com/educa%C3%A7%C3%A3o-fora-da-caixa/matriz-certezas-suposi%C3%A7%C3%B5es-e-d%C3%BAvidas-fa2263633655)
> - [Brainstorming](https://www.euax.com.br/2018/09/brainstorming/)

## Objetivos

Frente ao problema descrito acima, a proposta deste projeto é desenvolver uma solução de software composta basicamente por uma aplicação backend que opere em conjunto com um frontend web e, ao mesmo tempo, com um aplicativo mobile voltado para o sistema operacional Android.

A ferramenta, conforme será melhor detalhado adiante, deverá permitir que os prestadores e prestadoras de serviço definam suas agendas de horários e, uma vez que isto seja feito, seus clientes possam consultar horários disponíveis e realizar agendamentos de forma automatizada.

 
> **Links Úteis**:
> - [Objetivo geral e objetivo específico: como fazer e quais verbos utilizar](https://blog.mettzer.com/diferenca-entre-objetivo-geral-e-objetivo-especifico/)

## Justificativa

	A tecnologia tem o potencial de simplificar a execução de tarefas que, sem ela, demandam mais tempo e esforço para serem realizadas. Via de regra, os prestadores de serviços que atuam enquanto microempreendedores individuais possuem pouco ou nenhum apoio enquanto realizam suas atividades, o que na prática significa executar sem ajuda todas as tarefas da administração do seu pequeno negócio. Uma dessas tarefas é o agendamento de clientes, que envolve manter o controle dos atendimentos para evitar conflitos de horários, sobrecargas e outros problemas que podem ser causados por falhas na organização. Além disso, é preciso combinar cada atendimento individualmente, seja por mensagens, ligações ou mesmo conversas cara a cara.
 
Pode ser frustrante para os clientes quando eles tentam agendar um serviço e ficam sem resposta por longos períodos. De forma semelhante, pode ser altamente estressante para o(a) prestador(a) de serviço interromper suas atividades constantemente para conversar com clientes, gerenciando manualmente seus horários e compromissos.

Este projeto pretende oferecer a quem trabalha no ramo da prestação de serviços a automação de uma tarefa indispensável ao seu negócio, através de uma ferramenta simples e de fácil adaptação à estratégia de atuação já desenvolvida por cada pessoa. Além disso, será possível oferecer um atendimento mais prático e com menor tempo de espera, o que poderá trazer ganhos secundários derivados da maior satisfação e fidelização da base de clientes.

Essa aplicação permitirá que microempreendedores aprimorem significativamente a gestão de seus horários, reduzindo sua carga de trabalho e, ao mesmo tempo, oferecendo um serviço mais conveniente e satisfatório aos seus clientes.


> **Links Úteis**:
> - [Como montar a justificativa](https://guiadamonografia.com.br/como-montar-justificativa-do-tcc/)

## Público-Alvo

O público-alvo é composto por micro e pequenos empreendedores do setor de serviços de beleza, como cabeleireiros, barbeiros, esteticistas, manicures, entre outros. Em um primeiro momento, busca-se atender às necessidades de prestadores de serviços pertencentes a camadas socioeconômicas mais vulneráveis, que frequentemente enfrentam o desafio de lidar com múltiplas tarefas simultâneas devido à natureza de seus negócios. Para esse público, uma solução mais simples e gratuita, em comparação às opções existentes no mercado, seria altamente benéfica.

Espera-se que a maioria dos usuários seja formada por profissionais que promovem seus serviços por meio das redes sociais e do WhatsApp, demonstrando um nível básico de familiaridade com tecnologia. Além disso, o produto também atenderá os clientes desses profissionais, que se tornarão usuários da aplicação ao utilizarem a ferramenta para agendar atendimentos. A adesão por parte dos clientes é esperada principalmente daqueles que utilizam redes sociais e se sentem confortáveis com a comunicação online – um perfil cada vez mais comum e diversificado na população.

> **Links Úteis**:
> - [Público-alvo](https://blog.hotmart.com/pt-br/publico-alvo/)
> - [Como definir o público alvo](https://exame.com/pme/5-dicas-essenciais-para-definir-o-publico-alvo-do-seu-negocio/)
> - [Público-alvo: o que é, tipos, como definir seu público e exemplos](https://klickpages.com.br/blog/publico-alvo-o-que-e/)
> - [Qual a diferença entre público-alvo e persona?](https://rockcontent.com/blog/diferenca-publico-alvo-e-persona/)

# Especificações do Projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|----------------------------------------|----|
|RNF-001| O sistema deve executar gestão de agendas (Criar,editar,excluir horários) | ALTA | 
|RNF-002| Gerencia o acesso dos usuários à plataforma | MÉDIA | 
|RNF-003| Processamento de login de usuário, sistema deve prover autenticação e autorização (segurança) |  ALTA | 
|RNF-004| O sistema deve executrar gestão de usuários (alteração, consulta e exclusão) |  MÉDIA | 
|RNF-005| Gestão de serviços (consulta, inclusão e exclusão) | BAIXA | 




### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|----------------------------------------|----|
|RNF-001| A interface deve ser responsiva para se adaptar a diferentes tamanhos de tela | ALTA |
|RNF-002| O sistema mobile deve ser compatível com Android e iOS | ALTA |
|RNF-003| O sistema deve permitir autenticação por senha, garantindo armazenamento seguro das credenciais dos usuários |  ALTA |
|RNF-004| O sistema deve funcionar corretamente nos seguintes navegadores (Google Chrome, Firefox, Microsoft Edge) |  MÉDIA |
|RNF-005| O sistema deve atender às normas de segurança e privacidade de dados (como a LGPD) | BAIXA |
|RNF-006| O tempo de resposta das principais funcionalidades, como agendamentos, deve ser inferior a 5 segundos |  BAIXA |


Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto faz parte de uma proposta didática e tem como foco a construção de conhecimento dos estudantes, enquanto é desenvolvido um sistema útil em um cenário real. Esta proposta e o contexto do setor de autocuidado e beleza determinam as restrições apresentadas na tabela a seguir:

| ID   | Restrição                                                                                                                  |
|------|----------------------------------------------------------------------------------------------------------------------------|
| 01   | O projeto deverá ser entregue até o dia 29 de junho de 2025.                                                               |
| 02   | O desenvolvimento deverá utilizar as tecnologias e ferramentas definidas considerando os conhecimentos da equipe, a proposta acadêmica e a infraestrutura disponível. |
| 03   | O orçamento está restrito aos créditos gratuitos disponibilizados pela instituição, não havendo investimento em ferramentas ou serviços pagos. |
| 04   | A equipe de desenvolvimento é composta por alunos com experiência e habilidades em níveis básico ou intermediário, o que limita a complexidade das soluções implementadas. |
| 05   | A aplicação será projetada para suportar um número limitado de usuários simultâneos, adequado ao escopo de um projeto acadêmico. |

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

# Catálogo de Serviços

O Catálogo de Serviços do EasyBook organiza e detalha os serviços oferecidos tanto para usuários finais quanto para profissionais e empresas. Seu objetivo é garantir um funcionamento eficiente da plataforma, permitindo o agendamento digital de horários para diversos tipos de negócios, como clínicas médicas, salões de beleza, academias e outros.

Detalhamento dos Serviços:

1. Contas
Gerencia o acesso dos usuários à plataforma. Inclui:
- Cadastro de novo usuário: Criação de contas para novos clientes ou profissionais.
- Recuperar senha: Processo de redefinição de senha para usuários que esqueceram suas credenciais.
- Alteração de dados cadastrais: Permite que usuários atualizem suas informações pessoais, como nome, telefone e e-mail.

2. Agendamentos
Núcleo da plataforma, permite aos usuários marcarem, cancelarem e gerenciarem compromissos. Inclui:
- Marcar novo horário: Interface para os clientes escolherem um serviço e um horário disponível.
- Cancelar agendamento: Opção para usuários cancelarem compromissos, conforme regras definidas pelo prestador.
- Reagendar horário: Permite que usuários alterem a data e o horário de um compromisso já agendado.
- Notificações de lembrete: Envio de alertas automáticos via e-mail ou SMS para lembrar os clientes dos agendamentos.

3. Suporte Técnico
Oferece assistência a usuários e empresas que utilizam a plataforma. Inclui:
- Suporte para usuários finais Pessoa Física: Atendimento a clientes que enfrentam dificuldades técnicas.
- Suporte para profissionais/empresas Pessoa Jurídica: Ajuda para negócios que utilizam a plataforma para gerenciar seus serviços.
- Relatar erro na plataforma: Canal para reportar bugs ou falhas técnicas.

| Serviço                 | Oferta de Serviço                                      | Prioridade | SLA Estimado |
|-------------------------|--------------------------------------------------------|------------|--------------|
| **Contas**              | Cadastro de novo usuário                              | Baixa      | Imediato     |
|                         | Recuperar senha                                       | Alta       | Imediato - 1h|
|                         | Alteração de dados cadastrais - Pessoa Física         | Baixa      | Imediato     |
|                         | Alteração de dados cadastrais                         | Média      | Imediato - 1h|
| **Agendamentos**        | Marcar novo horário                                   | Baixa      | Imediato     |
|                         | Cancelar agendamento                                 | Média       | Imediato - 1h|
|                         | Reagendar horário                                    | Média       | Imediato - 1h|
| **Suporte Técnico**     | Suporte para usuários finais - PF                     | Média       | 30min - 4h  |
|                         | Suporte para profissionais/empresas - PJ              | Alta       | Imediato - 2h|
|                         | Relatar erro na plataforma                           | Alta       | 1h - 72h     |

# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![arq](https://github.com/user-attachments/assets/b9402e05-8445-47c3-9d47-f11696e38a3d)


## Tecnologias Utilizadas

Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.


 
🛠 Ambiente de Desenvolvimento
✔ Visual Studio Code (VS Code) – IDE principal para escrever e depurar código.

💻 Linguagens de Programação
✔ JavaScript – Utilizado para o desenvolvimento frontend e interações dinâmicas.
✔ Python – Utilizado para o backend, criação de API e manipulação de dados.

 Desenvolvimento Frontend (Interface do Usuário)
✔ React.js – Framework JavaScript para desenvolvimento de interfaces web dinâmicas e reativas.
✔ jQuery – Biblioteca JavaScript para manipulação do DOM e simplificação de chamadas AJAX.

 Desenvolvimento Mobile
✔ React Native – Framework baseado em React para desenvolvimento de aplicativos móveis (Android e iOS).

⚙ Backend e APIs
✔ Flask (Python) – Framework leve para criação de APIs RESTful.
✔ Requests (Python) – Biblioteca para realizar requisições HTTP e consumir APIs.

🔗 Relação entre as Tecnologias
1️⃣ O usuário acessa a aplicação via navegador (React.js) ou aplicativo mobile (React Native).
2️⃣ O frontend envia requisições HTTP para a API desenvolvida em Flask, utilizando chamadas AJAX/jQuery ou Fetch API no React.
3️⃣ O backend Flask processa as requisições e pode:

Buscar dados em um banco de dados.
Fazer chamadas externas via Requests.
Processar informações e retornar uma resposta em JSON.
4️⃣ O frontend recebe os dados da API e os exibe dinamicamente na interface.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)
