# APIs e Web Services

O EasyBook é uma plataforma de agendamento desenvolvida para profissionais do setor de beleza e autocuidado, como cabeleireiros e esteticistas. A solução automatiza a gestão de horários por meio de um sistema integrado (web e mobile), permitindo que os clientes agendem serviços de forma prática e rápida.

Com isso, o EasyBook reduz a carga de trabalho dos microempreendedores, evita conflitos de agenda e melhora a experiência do cliente, contribuindo para a fidelização e o crescimento do negócio.

## Objetivos da API

A API da Gestão de agenda tem como objetivo principal permitir que clientes e profissionais da beleza gerenciem compromissos de forma simples e eficiente. Além disso, ela deve:

- Permitir que clientes agendem, editem e cancelem seus compromissos.
- Possibilitar que profissionais personalizem e gerenciem sua agenda conforme disponibilidade.
- Garantir a segurança e privacidade dos dados dos usuários.
- Fornecer uma interface rápida e responsiva.
- Facilitar futuras integrações com outros sistemas.


## Modelagem da Aplicação

A aplicação EasyBook foi modelada para facilitar o agendamento de serviços entre clientes e prestadores, com cinco entidades principais:

- Usuários (usuarios): Armazena dados de autenticação e identificação, diferenciando clientes e prestadores por meio do campo tipo.
- Prestadores (prestadores): Relaciona-se com usuarios e armazena informações complementares, como fotos, descrição dos serviços e se aceita avaliações.
- Horários (horarios): Define os horários disponíveis de cada prestador, incluindo data, duração e limite de clientes.
- Atendimentos (atendimentos): Representa um agendamento feito por um cliente, com status controlado via enum (solicitado, confirmado, realizado, cancelado).
- Avaliações (avaliacoes): Associadas aos atendimentos, permitem que o cliente avalie o serviço prestado com estrelas e comentário.

A modelagem utiliza chaves estrangeiras para garantir integridade entre as tabelas, e campos lógicos de exclusão (deletado) para preservar o histórico. Essa estrutura garante flexibilidade, rastreabilidade e suporte à evolução da aplicação.

![image](https://github.com/user-attachments/assets/5de1639a-ec74-47f4-a852-06859311f2ff)


## Tecnologias Utilizadas

A API da Gestão de agenda foi desenvolvida utilizando as seguintes tecnologias:

- Node.js e Express para o backend.
- Body-parser para processamento de JSON.
- CORS para controle de acessos externos.
- UUID para geração de identificadores únicos.
- Google BigQuery para armazenamento futuro de dados.

## API Endpoints

### Endpoint 1
- Método: GET
- URL: /endpoint1
- Parâmetros:
  - param1: [descrição]

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
{
  "message": "Appointment updated successfully",
  
}
```

> Erro (400):

```
    {  
      "message": "Título, mensagem e token são obrigatórios."
    }
```
> Erro (500):

```
    {  
      "message": "Erro ao enviar notificação."
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

- Sucesso (200 OK)
  
```
{
  "message": "Agendamento adicionado com sucesso."
}
```

> Erro (400):

```
{
  "message": "Serviço e data/hora são obrigatórios."  
}
```

###  API - Usuários e Autenticação:

## Cadastrar Usuários

#### Método: POST /api/user

* Corpo da Requisição:
```
{
  "usuario": "string",
  "senha": "string",
  "tipo": "string",
  "nomeExibicao": "string",
  "fotoPerfil": "string"
}
```

> Resposta:

- Sucesso (200 OK)
  
```
{
  "message": "Usuário cadastrado com sucesso!"
}
```

> Erro (400):

```
{
  "message": "A senha não pode ser nula ou vazia." 
}
```

> Erro (500):

```
{
  "message": "Erro inesperado ao cadastrar o usuário." 
}
```

## Listar Usuários

#### Método: GET /api/user

> Resposta:

- Sucesso (200 OK)
  
```
[
  {
    "id": 1,
    "usuario": "string",
    "senha": "string (criptografada)",
    "tipo": "string",
    "nomeExibicao": "string",
    "fotoPerfil": "string",
    "deletado": false
  }
]
```
## Buscar Usuário por ID

#### Método: GET /api/user/:id

> Resposta:

- Sucesso (200 OK)

```
{
  "id": 1,
  "usuario": "string",
  "senha": "string (criptografada)",
  "tipo": "string",
  "nomeExibicao": "string",
  "fotoPerfil": "string",
  "deletado": false
}
```
> Erro (404):

```
{
  "message": "Usuário não encontrado." 
}
```

## Atualizar Usuário

#### Método: PUT /api/user/:id

* Corpo da Requisição: (campos opcionais para atualização)
```
{
  "usuario": "string",
  "senha": "string",
  "tipo": "string",
  "nomeExibicao": "string",
  "fotoPerfil": "string"
}
```
> Resposta:

- Sucesso (200 OK)
  
```
{
  "message": "Usuário atualizado com sucesso!"
}
```
> Erro (409):

```
{
  "message": "Já existe um usuário com esse nome de login."
}
```

> Erro (404):

```
{
   "message": "Usuário não encontrado." 
}
```

> Erro (500):

```
{
   "message": "Erro ao atualizar usuário." 
}
```

## Deletar Usuário

#### Método: DELETE /api/user/:id

> Resposta:

- Sucesso (200 OK)
  
```
{
  "message": "Usuário deletado com sucesso!"
}
```
> Erro (404):

```
{
  "message": "Usuário não encontrado." 
}
```
> Erro (500):

```
{
   "message": "Erro ao deletar usuário." 
}
```

## Autenticação de Usuarios (Login)

#### Método: POST /login

* Corpo da Requisição:
```
{
  "usuario": "string",
  "senha": "string"
}
```
> Resposta:

- Sucesso (200 OK)
  
```
{
  "token": "token"
}
```
> Erro (400):

```
{
  "message": "Usuário e senha são obrigatórios."
}
```
> Erro (401):

```
{
  "message": "Credenciais inválidas."
}
```
> Erro (500):

```
{
  "message": "Erro interno no servidor."
}
```

## Considerações de Segurança

- Implementação de autenticação por senha e armazenamento seguro das credenciais (RNF-003).
- Uso de HTTPS para garantir comunicação segura.
- Conformidade com a LGPD para proteção de dados do usuário (RNF-005).

## Implantação

## 1. Requisitos de Hardware e Software

- **Servidor**: Mínimo de 2 vCPUs, 4 GB de RAM e 20 GB de armazenamento.
- **Sistema Operacional**: Linux (Ubuntu recomendado).
- **Dependências**:
  - Node.js e npm (para a aplicação em JavaScript).
  - Java JDK (versão compatível com o projeto).
  - Maven ou Gradle (dependendo da aplicação Java).
  - Git e acesso à internet para instalação de pacotes e atualizações.

## 2. Plataforma de Hospedagem

- Utilizar a **AWS** como plataforma de hospedagem.
- Recomenda-se o uso de uma instância **EC2**.
- Alternativas: AWS Elastic Beanstalk (para Java) ou ECS (para aplicações conteinerizadas).

## 3. Configuração do Ambiente de Implantação

- Acesse a instância EC2 via **SSH**.
- Clone o repositório da aplicação com Git.
- Para a parte em **Node.js**:
  - Execute `npm install` para instalar as dependências.
- Para a parte em **Java**:
  - Compile e construa o projeto com `mvn package` ou `gradle build`.
- Configure as **variáveis de ambiente**, utilizando um arquivo `.env` ou diretamente no sistema.

## 4. Deploy da Aplicação

- **Node.js**:
  - Inicie com `node server.js` ou `npm start`.
- **Java**:
  - Execute com `java -jar nome-do-arquivo.jar`.
- Use gerenciadores de processo:
  - PM2 para aplicações Node.js.
  - `systemd` ou `nohup` para aplicações Java.
- Certifique-se de que as portas estejam liberadas no **grupo de segurança** da instância EC2.

## 5. Testes e Manutenção

- Realize testes manuais e/ou automatizados para ambas as aplicações.

## Testes

- Testes unitários: Testar funções individuais da API.
- Testes de integração: Garantir a interação correta entre componentes.
- Testes de carga: Avaliar o desempenho da API sob grande volume de requisições (RNF-006).

# Referências

- Documentação do Express.js
- Guia sobre CORS
- Uso do BigQuery
