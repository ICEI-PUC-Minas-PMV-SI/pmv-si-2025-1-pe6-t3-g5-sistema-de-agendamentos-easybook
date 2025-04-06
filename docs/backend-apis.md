# APIs e Web Services

O EasyBook é uma plataforma de agendamento desenvolvida para profissionais do setor de beleza e autocuidado, como cabeleireiros e esteticistas. A solução automatiza a gestão de horários por meio de um sistema integrado (web e mobile), permitindo que os clientes agendem serviços de forma prática e rápida.

Com isso, o EasyBook reduz a carga de trabalho dos microempreendedores, evita conflitos de agenda e melhora a experiência do cliente, contribuindo para a fidelização e o crescimento do negócio.

## Objetivos da API

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

- Node.js e Express para o backend.
- Body-parser para processamento de JSON.
- CORS para controle de acessos externos.
- UUID para geração de identificadores únicos.

## API Endpoints

### API de Gestão da agenda:

## Listar Agendamentos 
* Retorna a lista de agendamentos cadastrados, com possibilidade de filtrar por professionalId e/ou date.

#### Método: GET /appointments
#### Parâmetros:
* professionalId (opcional): Filtra agendamentos por profissional.
* date (opcional): Filtra agendamentos por data.

> Exemplo:

* Sem Filtro: GET http://localhost:5000/appointments
* Com Filtros: GET http://localhost:5000/appointments?professionalId=prof456&date=2025-04-06

> Resposta:

```
{
  "message": "Success",
  "data": [
    {
      "id": "gerado-com-uuid",
      "clientId": "string",
      "professionalId": "string",
      "serviceId": "string",
      "date": "YYYY-MM-DD",
      "time": "HH:MM:SS"
    },
    // ... outros agendamentos
  ]
}

```

> Erro:

```
{
  "message": "Error",
  "error": "Mensagem de erro detalhada"
}
```

## Criar Agendamento
* Cria um novo agendamento no banco de dados.
  
#### Método: POST /appointments

> Corpo da Requisição:

```
{
  "clientId": "string",
  "professionalId": "string",
  "serviceId": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:MM:SS"
}
```

> Resposta:

```
{
  "message": "Appointment created successfully",
  "data": {
    "id": "gerado-com-uuid",
    "clientId": "string",
    "professionalId": "string",
    "serviceId": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:MM:SS"
  }
}
```

> Erro (Quando faltam campos obrigatórios):

```
{
  "message": "Error",
  "error": { "details": "Missing required fields" }
}
```

> Erro (Em caso de erro interno):

```
{
  "message": "Error",
  "error": "Mensagem de erro detalhada"
}
```

## Atualizar Agendamento
* Atualiza um agendamento existente identificado pelo id informado na URL.

#### Método: PUT /appointments/:id
* Substitua :id pelo ID real do agendamento.

> Corpo da Requisição: JSON com os campos a serem atualizados (os campos são opcionais, mas deve haver pelo menos um).

> Exemplo de Requisição
```
{
  "date": "YYYY-MM-DD",
  "time": "HH:MM:SS"
}
```

> Resposta:
```
{
  "message": "Appointment updated successfully",
  "data": {
    "id": "gerado-com-uuid",
    "clientId": "string",
    "professionalId": "string",
    "serviceId": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:MM:SS"
  }
}
```

> Erro (Quando o Agendamento não é encontrado):

```
{
  "message": "Error",
  "error": { "details": "Appointment not found" }
}
```

> Erro (Quando nenhum campo para atualização é fornecido):

```
{
  "message": "Error",
  "error": { "details": "No fields provided for update" }
}
```

> Erro (Em caso de erro interno):

```
{
  "message": "Error",
  "error": "Mensagem de erro detalhada"
}
```


### API de Notificações Mobile:

## Notificar Agendamento

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

- Implementação de autenticação por senha e armazenamento seguro das credenciais.
- Uso de HTTPS para garantir comunicação segura.
- Conformidade com a LGPD para proteção de dados do usuário.

## Implantação

#### 1. Requisitos de Hardware e Software

- **Servidor**: Mínimo de 2 vCPUs, 4 GB de RAM e 20 GB de armazenamento.
- **Sistema Operacional**: Linux (Ubuntu recomendado).
- **Dependências**:
  - Node.js e npm (para a aplicação em JavaScript).
  - Java JDK (versão compatível com o projeto).
  - Maven.
  - Git e acesso à internet para instalação de pacotes e atualizações.

#### 2. Plataforma de Hospedagem

- Utilizar a **AWS** como plataforma de hospedagem.
- Recomenda-se o uso de uma instância **EC2**.

#### 3. Configuração do Ambiente de Implantação

- Acesse a instância EC2 via **SSH**.
- Clone o repositório da aplicação com Git.
- Para a parte em **Node.js**:
  - Execute `npm install` para instalar as dependências.
- Para a parte em **Java**:
  - Compile e construa o projeto com `mvn package`.
- Configure as **variáveis de ambiente**, utilizando um arquivo `.env` ou diretamente no sistema.

#### 4. Deploy da Aplicação

- **Node.js**:
  - Inicie com `node server.js` ou `npm start`.
- **Java**:
  - Execute com `java -jar nome-do-arquivo.jar`.
- Use gerenciadores de processo:
  - PM2 para aplicações Node.js.
  - `systemd` ou `nohup` para aplicações Java.
- Certifique-se de que as portas estejam liberadas no **grupo de segurança** da instância EC2.

#### 5. Testes e Manutenção

- Realize testes manuais e/ou automatizados para ambas as aplicações.

## Testes

- Testes unitários: Testar funções individuais da API.
- Testes de integração: Garantir a interação correta entre componentes.
- Testes de carga: Avaliar o desempenho da API sob grande volume de requisições (RNF-006).

## Referências

- Documentação do Express.js
- Guia sobre CORS
