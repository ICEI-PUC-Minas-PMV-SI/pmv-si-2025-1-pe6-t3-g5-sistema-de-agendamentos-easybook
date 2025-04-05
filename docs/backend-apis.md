# APIs e Web Services

*O planejamento de uma aplicação de APIS Web é uma etapa fundamental para o sucesso do projeto. Ao planejar adequadamente, você pode evitar muitos problemas e garantir que a sua API seja segura, escalável e eficiente.*

*Aqui estão algumas etapas importantes que devem ser consideradas no planejamento de uma aplicação de APIS Web.*

*[Inclua uma breve descrição do projeto.]*

O EasyBook é uma plataforma de agendamento desenvolvida para profissionais do setor de beleza e autocuidado, como cabeleireiros e esteticistas. A solução automatiza a gestão de horários por meio de um sistema integrado (web e mobile), permitindo que os clientes agendem serviços de forma prática e rápida.

Com isso, o EasyBook reduz a carga de trabalho dos microempreendedores, evita conflitos de agenda e melhora a experiência do cliente, contribuindo para a fidelização e o crescimento do negócio.

## Objetivos da API

*O primeiro passo é definir os objetivos da sua API. O que você espera alcançar com ela? Você quer que ela seja usada por clientes externos ou apenas por aplicações internas? Quais são os recursos que a API deve fornecer?*

*[Inclua os objetivos da sua api.]*

A API da Gestão de agenda tem como objetivo principal permitir que clientes e profissionais da beleza gerenciem compromissos de forma simples e eficiente. Além disso, ela deve:

- Permitir que clientes agendem, editem e cancelem seus compromissos.
- Possibilitar que profissionais personalizem e gerenciem sua agenda conforme disponibilidade.
- Garantir a segurança e privacidade dos dados dos usuários.
- Fornecer uma interface rápida e responsiva.
- Facilitar futuras integrações com outros sistemas.


## Modelagem da Aplicação
*[Descreva a modelagem da aplicação, incluindo a estrutura de dados, diagramas de classes ou entidades, e outras representações visuais relevantes.]*


## Tecnologias Utilizadas

*Existem muitas tecnologias diferentes que podem ser usadas para desenvolver APIs Web. A tecnologia certa para o seu projeto dependerá dos seus objetivos, dos seus clientes e dos recursos que a API deve fornecer.*

*[Lista das tecnologias principais que serão utilizadas no projeto.]*

A API da Gestão de agenda foi desenvolvida utilizando as seguintes tecnologias:

- Node.js e Express para o backend.
- Body-parser para processamento de JSON.
- CORS para controle de acessos externos.
- UUID para geração de identificadores únicos.
- Google BigQuery para armazenamento futuro de dados.

## API Endpoints

*[Liste os principais endpoints da API, incluindo as operações disponíveis, os parâmetros esperados e as respostas retornadas.]*

### Endpoint 1
- Método: GET
- URL: /endpoint1
- Parâmetros:
  - param1: [descrição]
- Resposta:
  - Sucesso (200 OK)
    ```
    {
      "message": "Success",
      "data": {
        ...
      }
    }
    ```
  - Erro (4XX, 5XX)
    ```
    {
      "message": "Error",
      "error": {
        ...
      }
    }
    ```
### API de Gestão da agenda:

## Listar Agendamentos

#### Método: GET /appointments

#### Parâmetros:
* professionalId (opcional): Filtra agendamentos por profissional.
* date (opcional): Filtra agendamentos por data.

> Resposta:

```
{
  "message": "Success",
  "data": [ {...} ]
}
```

> Erro:

```
{
  "message": "Error",
  "error": { "details": "Mensagem do erro" }
}
```

## Criar Agendamento

#### Método: POST /appointments

* Corpo da Requisição:

```
{
  "clientId": "string",
  "professionalId": "string",
  "serviceId": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:MM"
}
```

> Resposta:

```
{
  "message": "Appointment created successfully",
  "data": { "id": "uuid", ... }
}
```

> Erro:

```
{
  "message": "Error",
  "error": { "details": "Missing required fields" }
}
```

## Atualizar Agendamento

#### Método: PUT /appointments/:id

* Corpo da Requisição: (campos opcionais para atualização)

```
{
  "clientId": "string",
  "professionalId": "string",
  "serviceId": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:MM"
}
```

> Resposta:

```
{
  "message": "Appointment updated successfully",
  "data": { "id": "uuid", ... }
}
```

> Erro:

```
{
  "message": "Error",
  "error": { "details": "Appointment not found" }
}
```
## Notificar Agendamento

### API de Notificações Mobile:

#### Método: POST 

* Corpo da Requisição:

```
{
  "servico": "string",
  "dataHora": "YYYY-MM-DD HH:MM"
}
```
> Resposta:
```
- Sucesso (200 OK)
    ```
    {
      "message": "Notificação enviada!",
      "data": {
        ...
      }
    }
    ```
  - Erro (4XX, 5XX)
    ```
    {
      "message": "Erro ao enviar notificação:",
      "message": "Título, mensagem e token são obrigatórios."
    }
```
### API de Notificações Web push:

#### Método: POST 

* Corpo da Requisição:
```
  {
    "servico": "string",
    "dataHora": "YYYY-MM-DD HH:MM"
  }
```

> Resposta:

```
- Sucesso (200 OK)
    ```
    {
      "message": "Agendamento adicionado com sucesso.",
      
    }
    ```
  - Erro (4XX, 5XX)
    ```
    {
      "message": "Erro ao enviar notificação:",
      "message": "Serviço e data/hora são obrigatórios."
    }
```




## Considerações de Segurança

*[Discuta as considerações de segurança relevantes para a aplicação distribuída, como autenticação, autorização, proteção contra ataques, etc.]*

- Implementação de autenticação por senha e armazenamento seguro das credenciais (RNF-003).
- Validação de entrada de dados para prevenir ataques como SQL Injection e XSS.
- Uso de HTTPS para garantir comunicação segura.
- Conformidade com a LGPD para proteção de dados do usuário (RNF-005).

## Implantação

*[Instruções para implantar a aplicação distribuída em um ambiente de produção.]*

*1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.*
*2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.*
*3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.*
*4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.*
*5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.*

- Configurar um servidor ou usar uma solução em nuvem (AWS, GCP, etc.).
- Instalar dependências com npm install.
- Configurar variáveis de ambiente.
- Executar a API com node server.js ou npm start.
- Configurar monitoramento e logs para manutenção.

## Testes

*[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]*

*1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.*
*2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.*
*3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.*
*4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.*
*5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.*

- Testes unitários: Testar funções individuais da API.
- Testes de integração: Garantir a interação correta entre componentes.
- Testes de carga: Avaliar o desempenho da API sob grande volume de requisições (RNF-006).

# Referências

*Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.*

- Documentação do Express.js
- Guia sobre CORS
- Uso do BigQuery
