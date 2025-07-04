# Front-end Móvel

O EasyBook é uma plataforma de agendamento desenvolvida para profissionais do setor de beleza e autocuidado, como cabeleireiros e esteticistas. Esta etapa do projeto foca no desenvolvimento da interface mobile, garantindo uma experiência fluida, responsiva e otimizada para dispositivos móveis, permitindo que usuários e profissionais gerenciem agendamentos de forma prática e eficiente diretamente pelo celular.

## Projeto da Interface

A interface mobile permite que os clientes realizem agendamentos de forma prática e acessível diretamente pelo smartphone, enquanto os profissionais podem visualizar e gerenciar seus horários de maneira rápida e intuitiva, mesmo em movimento. O front-end mobile é projetado com foco em responsividade, usabilidade em telas menores e integração eficiente com a API da aplicação.

Com isso, o EasyBook oferece uma experiência otimizada para o uso mobile, aumentando a conveniência para os usuários, fortalecendo o relacionamento com os clientes e auxiliando os microempreendedores ao minimizar erros e conflitos de agenda.

Este projeto de front-end contempla o desenvolvimento completo da camada visual mobile da aplicação, incluindo:

### Wireframes

#### [Easybook no Figma](https://www.figma.com/design/juU3fxkgVJXXccndVplkDl/EasyBook--Copy-?node-id=2001-3&m=draw)

#### > *Wireframe da tela de cadastro da aplicação.*
![Tela home](./img/mobile-v2/01%20-%20cadastro.png) 

#### > *Wireframe da tela de login da aplicação.*
![Tela login](./img/mobile-v2/02%20-%20login.png)    

#### > *Wireframe da tela de perfil da aplicação.*
![Tela home](./img/mobile-v2/03%20-%20perfil%20usuário.png)   

#### > *Wireframe da tela de editar perfil da aplicação.*
![Tela home](./img/mobile-v2/04%20-%20editar%20perfil.png)  

#### > *Wireframe da tela lista de profissionais da aplicação.*
![Tela home](./img/mobile-v2/05%20-%20lista%20de%20profissionais.png)

#### > *Wireframe da tela de agenda da aplicação.*
![Tela agenda](./img/mobile-v2/06%20-%20agenda%20do%20profissional.png)

### Design Visual

O design da aplicação foi definido com os seguintes elementos visuais:

- **Paleta de cores:** Roxo `#8B5CF6` (primária), Branco `#F3F4F6`, Cinza `#6B7280`, Vermelho `#EF4444` e Verde `#10B981`
- **Tipografia:** Fonte principal: *Inter*, secundária: *Arial*.
- **Estilo:** Minimalista, com foco em clareza e hierarquia visual.

## Fluxo de Dados

[Diagrama ou descrição do fluxo de dados na aplicação.]

### Cadastro de Usuário (Cliente ou Servidor)

- Frontend (HTML/JS):

Usuário preenche o formulário (login, nome, senha, confirmação de senha)

Ao clicar em Cadastrar-se, o frontend faz uma requisição POST /api/cadastro.

- Backend (Java / Spring Boot):

Recebe os dados no endpoint.

Valida os campos.

Criptografa a senha.

Insere os dados no banco de dados.

Retorna resposta 201 Created ou 400 BadRequest se houver erro.
### Login do Usuário

- Frontend (HTML/JS):

Usuário insere e-mail e senha.

Ao clicar em Fazer Login, faz POST para /api/login.

- Backend:

Busca o usuário pelo e-mail.

Compara a senha fornecida com a senha criptografada no banco.

Se válido:

Gera um JWT token.

Retorna token e dados básicos (id, nome, tipo).

Se inválido:

Retorna 401 Unauthorized.
### Agendamento de Serviços
- Frontend:

Usuário logado acessa a tela de agendamento.

Escolhe serviço, data e horário.

Clica em Agendar → POST para /api/agendamentos com token JWT no header.

- Backend:

Valida o token JWT.

Verifica disponibilidade do serviço.

Se disponível, insere no banco.

Retorna 201 Created.

## Tecnologias Utilizadas

- Git e GitHub (controle de versão)
- Figma (para design e prototipagem)
- Radix (para paleta de cores)
- *Visual Studio Code*
- *IntelliJ*
- *JavaScript, HTML, CSS*
- *Java, Spring Boot*
- *MySQL*
- *Insomnia*
- React Native
- Expo


## Considerações de Segurança

Para garantir a integridade, confidencialidade e disponibilidade dos dados e operações no EasyBook, adotamos as seguintes práticas de segurança:

### Comunicação Segura (TLS/HTTPS)
- **HTTPS obrigatório**: Todas as requisições entre cliente e servidor devem ser feitas sobre HTTPS, com certificado válido, para proteger contra interceptação e MITM.  
- **HSTS (HTTP Strict Transport Security)**: Configurar o cabeçalho `Strict-Transport-Security` para forçar navegadores a utilizarem somente conexões seguras.

### Autenticação e Gerenciamento de Senhas
- **Hash de senhas**: Armazenar senhas usando algoritmos de hashing robustos (bcrypt ou Argon2), com salt único por usuário.  
- **Política de senha forte**: Validar, no frontend, requisitos mínimos de complexidade (tamanho, números, caracteres especiais) antes de enviar ao servidor.  
- **Limite de tentativas**: Bloquear temporariamente ou usar CAPTCHA após múltiplas tentativas de login falhas para prevenir força bruta.

### Tokens JWT e Controle de Sessão
- **Expiração curta**: Definir `exp` reduzido para o JWT; usar refresh tokens em cookies `HttpOnly` quando necessário.  
- **Armazenamento seguro**: Guardar tokens de acesso em cookies `Secure` e `HttpOnly`, não em `localStorage`.  
- **Revogação de tokens**: Manter lista de tokens revogados ou versionamento para possibilitar logout remoto e invalidação de sessões.

### Autorização e Escopo de Acesso
- **Verificação de escopos**: Cada endpoint deve validar não apenas a autenticidade do token, mas também as permissões (cliente vs. profissional).  
- **Menor privilégio**: Conceder apenas as permissões estritamente necessárias a cada tipo de usuário.

### Validação e Sanitização de Entrada
- **Validação dupla**: Validar no frontend (UX) e revalidar no backend (segurança) todos os dados recebidos.  
- **Proteção contra Injection**: Usar ORM ou consultas parametrizadas em todas as operações de banco para prevenir SQL/NoSQL injection.  
- **Sanitização de HTML**: Filtrar ou escapar tags em campos de texto livre para evitar XSS.

### Proteções Contra CSRF e XSS
- **CSRF tokens**: Exigir token anti-CSRF em requisições que alterem estado (POST, PUT, DELETE).  
- **Content Security Policy (CSP)**: Definir política de fontes e scripts confiáveis para mitigar XSS.  
- **Escapamento de dados**: Sempre escapar valores dinâmicos ao renderizar no DOM.

### Cabeçalhos de Segurança HTTP
- **X-Frame-Options**: `DENY` ou `SAMEORIGIN` para evitar clickjacking.  
- **X-Content-Type-Options**: `nosniff` para impedir detecção incorreta de tipos de conteúdo.  
- **Referrer-Policy**: Controlar informações de referer enviadas a terceiros.  
- **Permissions-Policy**: Desabilitar APIs de navegador não utilizadas (geolocalização, câmera etc.).

### Controle de CORS
- **Origem restrita**: Permitir apenas o domínio do frontend em `Access-Control-Allow-Origin`.  
- **Métodos e headers limitados**: Especificar apenas os métodos e cabeçalhos necessários.

### Monitoramento e Tratamento de Incidentes
- **Logs centralizados**: Registrar acessos, falhas de autenticação e erros críticos em solução de logs (ELK, Loggly).  
- **Alertas**: Configurar alertas para atividades suspeitas (múltiplas falhas de login, picos de requisições).  
- **Plano de resposta**: Definir procedimento para investigação, contenção e notificação em caso de incidente.

### Boas Práticas de Deploy
- **Ambientes isolados**: Separar dev, homologação e produção, com configurações independentes.  
- **Variáveis de ambiente seguras**: Armazenar segredos (chaves JWT, strings de conexão) em serviços de vault ou variáveis de ambiente do servidor.  
- **Atualizações regulares**: Manter frameworks, bibliotecas e sistema operacional sempre atualizados para mitigar vulnerabilidades conhecidas.


## Implantação


   A implantação do EasyBook foi realizada na Amazon Web Services (AWS), utilizando serviços escaláveis e gerenciados para garantir segurança, alta disponibilidade e desempenho. A aplicação foi dividida em duas camadas principais: frontend Web (estático) e API backend (Java Spring Boot), com integração ao banco de dados MySQL.

### 1. Arquitetura de Implantação
- Frontend Web: Hospedado no Amazon S3 com distribuição global via Amazon CloudFront.
- Backend (Spring Boot): Implantado em uma instância EC2 (t2.medium) executando Amazon Linux 2.
- Banco de Dados: Amazon RDS (MySQL) com backups automáticos habilitados.
- Gerenciamento de Domínio e HTTPS: Utilizado Amazon Route 53 para DNS e AWS Certificate Manager (ACM) para certificados TLS.
- Segurança: Controle de acesso via Security Groups e políticas de IAM, com as portas 80/443 abertas para acesso externo e 3306 apenas para a aplicação.

### 2. Etapas do Deploy
a) Front-end Web
- Gerado build de produção com npm run build.
- Arquivos estáticos enviados para um bucket S3 configurado como site estático.
- Distribuição via CloudFront com certificado SSL do ACM.
- Configurado o domínio personalizado no Route 53, apontando para o CloudFront.

b) API Backend
- Empacotado o projeto Spring Boot em um .jar via Maven/Gradle.
- Instância EC2 provisionada com Java 23 e configurada via SSH.
- Aplicação iniciada como serviço usando systemd ou nohup.
- Variáveis sensíveis como tokens e senhas foram inseridas via .env ou como variáveis do sistema.

c) Banco de Dados (MySQL)
- Instância RDS criada com backups, logs e criptografia ativados.
- Configurada VPC e Security Group permitindo acesso apenas da EC2.
- Rodados scripts de criação do schema e tabelas iniciais.

### 3. Boas Práticas Adotadas
- Ambientes isolados: Desenvolvimento, homologação e produção em ambientes separados.
- Backups automáticos: Ativados no RDS com retenção mínima de 7 dias.
- Deploy seguro: Acesso SSH restrito por IP e chave, uso de HTTPS obrigatório com redirecionamento 301.
- Escalabilidade: EC2 com possibilidade de auto scaling futuro; CloudFront garante alta performance no front-end.

## Testes

## Testes de interface

Os testes de interface foram feitos manualmente, seguindo o roteiro das tarefas descritas abaixo, com o objetivo de validar tanto as interações corretas com a API quanto a lógica interna da aplicação mobile.

### 1. criar conta

### a) clicar em "Cadastre-se" sem ter preenchido um ou mais campos.

**Resultado esperado**: a aplicação exibe um alerta no primeiro campo vazio.

**Resultado**: conforme o esperado.

### b) clicar em "Cadastre-se" com os campos preenchidos, porém com valores diferentes para "senha" e "confirmar senha".

**Resultado esperado**: a aplicação não registra o usuário e exibe um alerta de que as senhas não são iguais.

**Resultado obtido**: a aplicação falhou em executar a verificação, cadastrando o usuário com a senha fornecida no primeiro campo (ignorando o valor de "confirmar senha").

**Correção**: foi incluído um trecho de código para realizar a conferência antes do envio, e, em caso de diferença, emitir uma notificação (As senhas não coincidem.) e bloquear o envio.

**Resultado após a correção**: conforme o esperado.

### c) clicar em "Cadastre-se" com todos os campos preenchidos, sem omissões ou valores inválidos

**Resultado esperado**: a aplicação cadastra o novo usuário, realiza o login na nova conta e redireciona para a página inicial.

**Resultado obtido**: conforme o esperado.

### 2. fazer o login

### a) clicar em "Fazer Login" sem preencher as credenciais

**Resultado esperado**: a aplicação não envia os dados ao servidor e exibe um alerta no primeiro campo vazio (usuário ou senha).

**Resultado obtido**: conforme o esperado.

### b) clicar em "Fazer Login" com os dados preenchidos, porém informando um usuário inexistente

**Resultado esperado**: a aplicação front-end recebe do back-end a notificação de falha no login e exibe um alerta (Usuário ou senha inválidos.) de modo a não revelar se o erro foi referente ao nome de usuário ou à senha.

**Resultado obtido**: conforme o esperado.

### c) clicar em "Fazer Login" com um nome de usuário existente, porém a senha errada

**Resultado esperado**: a aplicação front-end recebe do back-end a notificação de falha no login e exibe um alerta (Usuário ou senha inválidos.) de modo a não revelar se o erro foi referente ao nome de usuário ou à senha.

**Resultado obtido**: conforme o esperado.

### d) clicar em "Fazer Login" com ambas as credenciais válidas

**Resultado esperado**: a aplicação realiza o login, registra devidamente o token de acesso e redireciona o usuário à página inicial.

**Resultado obtido**: conforme o esperado.

### 3. alterar a foto de perfil e o nome de exibição

### a) o usuário clica no botão de edição, na parte inferior da tela Perfil, preenche as novas informações e faz o envio do formulário.

**Resultado esperado**: o usuário é redirecionado para a página inicial, já com a foto e/ou nome atualizados.

**Resultado obtido**: conforme o esperado.

### 4. agendar horário (como cliente)

### a) após o login, na tela inicial, o usuário clica em "Agendar horário", sendo redirecionado para a tela Profissionais. Na tela Profissionais, o usuário visualiza uma lista de profissionais disponíveis, clica em um deles, e é redirecionado para a tela Agendamentos. Na tela Agendamentos, o usuário navega entre as datas, encontra um horário, clica neste horário, clica em "Agendar", vê uma caixa de diálogo solicitando a confirmação e, por fim, confirma.

**Resultado esperado**: o horário é agendado e imediatamente deixa de aparecer na lista de horário disponíveis.

**Resultado obtido**: conforme o esperado.

### b) após o login, na tela inicial, o usuário clica em "Agendar horário", sendo redirecionado para a tela Profissionais. Na tela Profissionais, o usuário visualiza uma lista de profissionais disponíveis, clica em um deles, e é redirecionado para a tela Agendamentos. Na tela Agendamentos, o usuário navega entre as datas, encontra um horário, clica neste horário, clica em "Agendar", vê uma caixa de diálogo solicitando a confirmação e, por fim, cancela a operação.

**Resultado esperado**: o horário não é agendado e segue aparecendo na lista de horário disponíveis.

**Resultado obtido**: conforme o esperado.

### 5. conferir horários agendados (como cliente)

### a) o(a) usuário(a) realiza login no aplicativo, e, na página inicial, vê uma lista de seus agendamentos contendo as informações de data, horário e nome do(a) profissional, além de um botão de cancelamento.  

**Resultado esperado**: para cada horário existente na data atual ou em datas futuras, é exibido um card com as informações "nome do(a) profissional", "data" e "hora", além de um botão "cancelar". Horários de datas passadas não são exibidos.

**Resultado obtido**: conforme o esperado.

### 6. cancelar horário agendado (como cliente)

### a) o(a) usuário(a) acessa o aplicativo, clica em um dos botões "cancelar" no card de um horário e confirma a exclusão na caixa de confirmação exibida.  

**Resultado esperado**: o agendamento é cancelado e imediatamente removido da lista de agendamentos. O agendamento volta imediatamente a aparecer como disponível no perfil do(a) profissional que o disponibilizou.

**Resultado obtido**: conforme o esperado.

# Referências

- [Figma – Documentação oficial](https://help.figma.com/)
- [Radix – Documentação](https://www.radix-ui.com/blog/themes-3)
