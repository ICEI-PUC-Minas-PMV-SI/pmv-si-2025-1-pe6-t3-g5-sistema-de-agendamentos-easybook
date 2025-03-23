# Introdução

Nos últimos anos, o setor de serviços de autocuidado e beleza como barbearias, cabeleireiros, esteticistas e outros tem crescido significativamente. Este projeto se propõe a oferecer uma ferramenta de auxílio a estes empreendedores e empreendedoras, particularmente no que diz respeito à gestão de seus horários de atendimento.

## Problema

A prestação de serviços de autocuidado é vista como uma oportunidade, principalmente por pessoas de baixa renda, uma vez que se trata de um mercado em expansão, com poucas barreiras de entrada e um investimento inicial relativamente baixo. Além disso, por se tratarem de serviços invariavelmente prestados de forma presencial e que possuem um potencial altamente restrito de ganhos de economia de escala, são pouco suscetíveis à monopolização e centralização, permitindo que pequenos prestadores construam e fidelizem suas clientelas regionais.

No entanto, esses microempreendedores se deparam com desafios substanciais, sobretudo na gestão de seus negócios. Nesse contexto, um dos desafios é o acúmulo de tarefas, dentre as quais se encontra a gestão de seus horários de disponibilidade e da marcação de horários com seus clientes.


## Objetivos

Frente ao problema descrito acima, a proposta deste projeto é desenvolver uma solução de software composta basicamente por uma aplicação backend que opere em conjunto com um frontend web e, ao mesmo tempo, com um aplicativo mobile voltado para o sistema operacional Android.

A ferramenta, conforme será melhor detalhado adiante, deverá permitir que os prestadores e prestadoras de serviço definam suas agendas de horários e, uma vez que isto seja feito, seus clientes possam consultar horários disponíveis e realizar agendamentos de forma automatizada.


## Justificativa

A tecnologia tem o potencial de simplificar a execução de tarefas que, sem ela, demandam mais tempo e esforço para serem realizadas. Via de regra, os prestadores de serviços que atuam enquanto microempreendedores individuais possuem pouco ou nenhum apoio enquanto realizam suas atividades, o que na prática significa executar sem ajuda todas as tarefas da administração do seu pequeno negócio. Uma dessas tarefas é o agendamento de clientes, que envolve manter o controle dos atendimentos para evitar conflitos de horários, sobrecargas e outros problemas que podem ser causados por falhas na organização. Além disso, é preciso combinar cada atendimento individualmente, seja por mensagens, ligações ou mesmo conversas cara a cara.
 
Pode ser frustrante para os clientes quando eles tentam agendar um serviço e ficam sem resposta por longos períodos. De forma semelhante, pode ser altamente estressante para o(a) prestador(a) de serviço interromper suas atividades constantemente para conversar com clientes, gerenciando manualmente seus horários e compromissos.

Este projeto pretende oferecer a quem trabalha no ramo da prestação de serviços a automação de uma tarefa indispensável ao seu negócio, através de uma ferramenta simples e de fácil adaptação à estratégia de atuação já desenvolvida por cada pessoa. Além disso, será possível oferecer um atendimento mais prático e com menor tempo de espera, o que poderá trazer ganhos secundários derivados da maior satisfação e fidelização da base de clientes.

Essa aplicação permitirá que microempreendedores aprimorem significativamente a gestão de seus horários, reduzindo sua carga de trabalho e, ao mesmo tempo, oferecendo um serviço mais conveniente e satisfatório aos seus clientes.


## Público-Alvo

O público-alvo é composto por micro e pequenos empreendedores do setor de serviços de beleza, como cabeleireiros, barbeiros, esteticistas, manicures, entre outros. Em um primeiro momento, busca-se atender às necessidades de prestadores de serviços pertencentes a camadas socioeconômicas mais vulneráveis, que frequentemente enfrentam o desafio de lidar com múltiplas tarefas simultâneas devido à natureza de seus negócios. Para esse público, uma solução mais simples e gratuita, em comparação às opções existentes no mercado, seria altamente benéfica.

Espera-se que a maioria dos usuários seja formada por profissionais que promovem seus serviços por meio das redes sociais e do WhatsApp, demonstrando um nível básico de familiaridade com tecnologia. Além disso, o produto também atenderá os clientes desses profissionais, que se tornarão usuários da aplicação ao utilizarem a ferramenta para agendar atendimentos. A adesão por parte dos clientes é esperada principalmente daqueles que utilizam redes sociais e se sentem confortáveis com a comunicação online – um perfil cada vez mais comum e diversificado na população.


# Especificações do Projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID     | Descrição do Requisito  |Prioridade |Responsáveis |
|-------|----------------------------------------|----|----|
|RF-001| O sistema deve executar gestão de agendas (Criar,editar,excluir horários) | ALTA | João, Bruno |
|RF-002| Serviço de Notificações | BAIXA | Jean, Lincoln |
|RF-003| O sistema deve executrar gestão de usuários, editar dados de perfil como nome, senha, descrição,  autenticação e autorização, excluir ou desativar perfil |  ALTA | Gabriel, Larissa |





### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|----------------------------------------|----|
|RNF-001| A interface deve ser responsiva para se adaptar a diferentes tamanhos de tela | ALTA |
|RNF-002| O sistema mobile deve ser compatível com Android e iOS | ALTA |
|RNF-003| O sistema deve permitir autenticação por senha, garantindo armazenamento seguro das credenciais dos usuários |  ALTA |
|RNF-004| O sistema deve funcionar corretamente nos seguintes navegadores (Google Chrome, Firefox, Microsoft Edge) |  MÉDIA |
|RNF-005| O sistema deve atender às normas de segurança e privacidade de dados (como a LGPD) | BAIXA |
|RNF-006| O tempo de resposta das principais funcionalidades, como agendamentos, deve ser inferior a 5 segundos |  BAIXA |


## Restrições

O projeto faz parte de uma proposta didática e tem como foco a construção de conhecimento dos estudantes, enquanto é desenvolvido um sistema útil em um cenário real. Esta proposta e o contexto do setor de autocuidado e beleza determinam as restrições apresentadas na tabela a seguir:

| ID   | Restrição                                                                                                                  |
|------|----------------------------------------------------------------------------------------------------------------------------|
| 01   | O projeto deverá ser entregue até o dia 29 de junho de 2025.                                                               |
| 02   | O desenvolvimento deverá utilizar as tecnologias e ferramentas definidas considerando os conhecimentos da equipe, a proposta acadêmica e a infraestrutura disponível. |
| 03   | O orçamento está restrito aos créditos gratuitos disponibilizados pela instituição, não havendo investimento em ferramentas ou serviços pagos. |


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

![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-g5-sistema-de-agendamentos-easybook/blob/main/docs/img/arquitetura%20-%20diagrama%20corrigido.png)


# Tecnologias Utilizadas
 
 ## Ambiente de Desenvolvimento
  - Visual Studio Code (VS Code) – IDE principal para escrever e depurar código.
  - Visual Studio - IDE da Microsoft para desenvolvimento.
  - ASP.NET Core - framework para desenvolvimento de APIs.

 ## Linguagens de Programação
  - JavaScript – Utilizado para o desenvolvimento frontend e interações dinâmicas.
  - .NET – Utilizado para o backend, criação de API e manipulação de dados.
  - JAVA

 ## Desenvolvimento Frontend (Interface do Usuário)
  - React.js – Framework JavaScript para desenvolvimento de interfaces web dinâmicas e reativas.
  - jQuery – Biblioteca JavaScript para manipulação do DOM e simplificação de chamadas AJAX.

 ## Desenvolvimento Mobile
  - React Native – Framework baseado em React para desenvolvimento de aplicativos móveis (Android e iOS).

 ## Backend e APIs
  - Flask (Python) – Framework leve para criação de APIs RESTful.
  - Requests (Python) – Biblioteca para realizar requisições HTTP e consumir APIs.
  - ASP.NET Core - para desenvolvimnento de APIs.

## Relação entre as Tecnologias
### 1️- O usuário acessa a aplicação via navegador ou aplicativo mobile.
### 2️- O frontend envia requisições HTTP para a API.
### 3️- O backend processa as requisições e pode:
 - Buscar dados em um banco de dados.
 - Fazer chamadas externas via Requests.
 - Processar informações e retornar uma resposta.
### 4️- O frontend recebe os dados da API e os exibe dinamicamente na interface.


![WhatsApp Image 2025-03-19 at 18 58 13](https://github.com/user-attachments/assets/61e4958a-2a8e-4f47-ba53-04af29f67849)

Figura representando como as tecnologias estão relacionadas e a interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.



# Hospedagem

Esta seção apresenta o planejamento e as estratégias adotadas para a hospedagem da aplicação, considerando as limitações orçamentárias e o contexto de um projeto acadêmico. Para o ambiente de produção, serão consideradas duas alternativas de plataforma: **Heroku** e **Vercel**.

## 1. Escolha da Plataforma

### Heroku
O Heroku configura-se como uma solução apropriada para a hospedagem do backend, principalmente devido à sua compatibilidade com aplicações desenvolvidas em Flask. O plano gratuito oferecido pela plataforma é compatível com as restrições de uso previstas para projetos acadêmicos, permitindo a integração com serviços adicionais, como bancos de dados (por exemplo, Heroku Postgres) e ferramentas de monitoramento.

### Vercel
A Vercel é uma alternativa robusta para o deploy do frontend, especialmente para aplicações desenvolvidas em React.js. Esta plataforma possibilita a hospedagem de arquivos estáticos com alta disponibilidade e baixa latência. A integração com repositórios Git e a capacidade de realizar deploys contínuos tornam a Vercel ideal para manter atualizações ágeis e alinhadas às melhores práticas de desenvolvimento.

## 2. Hospedagem do Backend

Para a implantação do backend (desenvolvido em Flask), serão adotadas as seguintes etapas:

- **Preparação do Código:**  
  - Adequação do código para execução em ambiente de produção, utilizando o servidor de aplicação Gunicorn para gerenciamento de requisições.
  - Criação de um arquivo `Procfile` com o comando de inicialização da aplicação, por exemplo:  
    ```
    web: gunicorn app:app
    ```
  - Definição de variáveis de ambiente para gerenciar informações sensíveis, como chaves de acesso e credenciais do banco de dados.

- **Banco de Dados:**  
  - Inicialmente, pode-se utilizar o SQLite para testes; contudo, recomenda-se a migração para uma solução relacional mais robusta (por exemplo, Heroku Postgres) para assegurar a integridade e a escalabilidade dos dados.

- **Deploy e Integração Contínua:**  
  - Realização do deploy da aplicação no Heroku, integrando o repositório Git para atualizações automáticas.
  - Configuração de add-ons para monitoramento e registro de logs, a fim de detectar e corrigir eventuais anomalias no desempenho.

## 3. Hospedagem do Frontend

Para o frontend, desenvolvido em React.js, o processo de hospedagem envolverá os seguintes passos:

- **Compilação e Otimização:**  
  - Compilação da aplicação para gerar os arquivos estáticos (diretório `build`), garantindo a otimização dos recursos para entrega aos usuários.

- **Deploy via Vercel:**  
  - Publicação dos arquivos compilados na Vercel, aproveitando a infraestrutura global da plataforma para assegurar alta disponibilidade e desempenho.
  - Configuração de variáveis de ambiente para definir os endpoints de comunicação com o backend hospedado no Heroku, promovendo uma integração eficiente entre as camadas da aplicação.

## 4. Integração e Fluxo de Comunicação

O fluxo operacional da aplicação será organizado da seguinte forma:

1. **Acesso do Usuário:**  
   O usuário acessa a interface da aplicação por meio do navegador (frontend hospedado na Vercel) ou através do aplicativo mobile.

2. **Envio de Requisições:**  
   O frontend encaminha requisições HTTP para a API desenvolvida em Flask e hospedada no Heroku.

3. **Processamento e Resposta:**  
   O backend processa as solicitações, interage com o banco de dados e executa as regras de negócio, retornando os dados processados em formato JSON.

4. **Atualização da Interface:**  
   Os dados recebidos pelo frontend são utilizados para atualizar dinamicamente a interface, proporcionando uma experiência de uso fluida e responsiva.

## 5. Considerações Finais

A escolha combinada das plataformas Heroku e Vercel permite explorar os pontos fortes de cada serviço, garantindo robustez e escalabilidade dentro dos parâmetros definidos pelo projeto acadêmico. A implementação de práticas de deploy contínuo e a configuração adequada dos ambientes de produção são essenciais para o sucesso da aplicação, contribuindo tanto para o aprendizado dos estudantes quanto para a oferta de uma solução funcional para microempreendedores do setor de beleza.

