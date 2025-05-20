# Front-end Web

O **EasyBook** é uma plataforma de agendamento desenvolvida para profissionais do setor de beleza e autocuidado, como cabeleireiros e esteticistas. Esta etapa do projeto foca no desenvolvimento da **interface web**, proporcionando uma experiência visual clara, intuitiva e acessível aos usuários.

## Projeto da Interface Web

A interface Web permite que clientes realizem agendamentos de forma prática e rápida, ao mesmo tempo em que os profissionais podem visualizar e organizar seus horários com facilidade. O front-end é projetado com foco em usabilidade e integração fluida com a API da aplicação.

Com isso, o EasyBook melhora significativamente a experiência do usuário final, contribui para a fidelização dos clientes e auxilia no crescimento dos microempreendedores ao reduzir erros e conflitos na agenda.

Este projeto de front-end contempla o desenvolvimento completo da camada visual da aplicação, incluindo:

### Wireframes 

#### [Easybook no Figma](https://www.figma.com/design/juU3fxkgVJXXccndVplkDl/EasyBook--Copy-?node-id=2001-3&m=draw)

#### > *Wireframe da tela de login da aplicação.*
![Tela login](./imagem/wireframe-login.jpeg)  

#### > *Wireframe da tela de cadastro da aplicação.*
![Tela home](./imagem/wireframe-cadastro.jpeg) 

#### > *Wireframe da tela inicial do profissional da aplicação.*
![Tela home](./imagem/wireframe-profissional.jpeg) 

#### > *Wireframe da tela inicial do cliente da aplicação.*
![Tela home](./imagem/wireframe-cliente.jpeg)

#### > *Wireframe da tela de edição de agenda da aplicação.*
![Tela agenda](./imagem/wireframe-agenda.jpeg)   

#### > *Wireframe da tela de editar perfil da aplicação.*
![Tela home](./imagem/wireframe-perfil.jpeg)  


### Design Visual
O design da aplicação foi definido com os seguintes elementos visuais:

- **Paleta de cores:** Roxo `#8B5CF6` (primária), Branco `#F3F4F6`, Cinza `#6B7280`, Vermelho `#EF4444` e Verde `#10B981`
- **Tipografia:** Fonte principal: *Inter*, secundária: *Arial*.
- **Estilo:** Minimalista, com foco em clareza e hierarquia visual.

## Fluxo de Dados

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
- Visual Studio Code
- IntelliJ
- JavaScript, HTML, CSS
- Java, Spring Boot
- MySQL
- Insomnia

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

Os testes de interface foram feitos manualmente, seguindo o roteiro das tarefas descritas abaixo, com o objetivo de validar tanto as interações corretas com a API quanto a lógica interna da aplicação web.

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

### a) o usuário clica em um dos botões de edição (lápis ao lado do nome ou "editar perfil" no menu drop-down), preenche as novas informações e faz o envio do formulário.

**Resultado esperado**: o usuário é redirecionado para a página inicial, já com a foto e/ou nome atualizados.

**Resultado obtido**: conforme o esperado.

### 4. disponibilizar horário

### a) o usuário, na condição de prestador de serviços, navega até a aba "editar agenda", seleciona um dia no calendário e clica no botão de adição (+).

**Resultado esperado**: um novo horário é criado na data selecionada e salvo automaticamente no banco de dados. Por padrão o novo horário é às 09:00, podendo ser editado na mesma tela em que foi criado.

**Resultado obtido**: conforme o esperado.

### 5. editar agenda de horários (como profissional)

### 5.1 - alterar um horário individualmente e salvar

### a) na aba "editar agenda", o profissional seleciona uma data para a qual existe um horário criado e altera o valor da hora. Após a alteração, clica em "salvar" (ícone de disquete).

**Resultado esperado**: o horário é atualizado no back-end, sendo exibida uma mensagem de sucesso referente apenas a um horário.

**Resultado obtido**: conforme o esperado.

### b) na aba "editar agenda", o profissional seleciona uma data para a qual existe um horário criado e altera o valor da hora. Após a alteração, clica em "salvar horários do dia".

**Resultado esperado**: o horário é atualizado no back-end, sendo exibida uma mensagem de sucesso referente apenas aos horários do dia de forma geral.

**Resultado obtido**: conforme o esperado.

### 5.2 - alterar múltiplos horários e salvar apenas uma parte

### a) na aba "editar agenda", o profissional seleciona uma data para a qual existem no mínimo três horários criados e altera o valor da hora de no mínimo dois deles, garantindo que ao menos um siga inalterado. Após a alteração, clica no botão "salvar" (ícone de disquete) de cada um dos horários alterados.

**Resultado esperado**: os horários são atualizados no back-end, sendo exibida uma mensagem de sucesso referente a cada salvamento individual.

**Resultado obtido**: conforme o esperado.

### b) na aba "editar agenda", o profissional seleciona uma data para a qual existem pelo menos três horários criados e altera o valor da hora de no mínimo dois deles, garantindo que ao menos um siga inalterado. Após a alteração, clica em "salvar horários do dia".

**Resultado esperado**: os horários são atualizados no back-end, sendo exibida uma mensagem de sucesso referente apenas aos horários do dia de forma geral.

**Resultado obtido**: conforme o esperado.

### 5.3 -  alterar múltiplos horários e salvar todos

### a) na aba "editar agenda", o profissional seleciona uma data para a qual existem no mínimo três horários criados e altera todos eles. Após a alteração, clica no botão "salvar" (ícone de disquete) de cada um dos horários alterados.

**Resultado esperado**: todos os horários são atualizados no back-end, sendo exibida uma mensagem de sucesso referente a cada salvamento individual.

**Resultado obtido**: conforme o esperado.

### a) na aba "editar agenda", o profissional seleciona uma data para a qual existem pelo menos três horários criados e altera o valor da hora de todos eles. Após a alteração, clica em "salvar horários do dia".

**Resultado esperado**: todos horários são atualizados no back-end, sendo exibida uma mensagem de sucesso referente apenas aos horários do dia de forma geral.

**Resultado obtido**: conforme o esperado.

### 6. agendar horário (como cliente)

### a) acessando o perfil de um(a) profissional ([...]/visualizar-perfil.html?usuario={id}), o(a) cliente verifica a lista de horários disponíveis para a data desejada, clica neste horário e confirma o agendamento na caixa de confirmação exibida.

**Resultado esperado**: o horário é agendado e imediatamente deixa de aparecer na lista de horário disponíveis.

**Resultado obtido**: conforme o esperado.

### 7. conferir horários agendados (como cliente)

### a) o(a) usuário(a), tendo agendamentos para datas passadas, para a data atual e para datas posteriores, acessa a página "perfil comum".  

**Resultado esperado**: para cada horário existente na data atual ou em datas futuras, é exibido um card com as informações "nome do(a) profissional", "data" e "hora", além de um botão "cancelar". Horários de datas passadas não são exibidos.

**Resultado obtido**: conforme o esperado.

### 8. conferir horários agendados (como prestador)

### a) o(a) usuário(a), tendo agendamentos para datas passadas, para a data atual e para datas posteriores, acessa a página "perfil profissional".  

**Resultado esperado**: para cada horário existente na data atual ou em datas futuras, é exibido um card com as informações "nome do(a) profissional", "data" e "hora", além de um botão "cancelar". Horários de datas passadas não são exibidos.

**Resultado obtido**: conforme o esperado.

### 9. cancelar horário agendado (como cliente)

### a) o(a) usuário(a) acessa a página "perfil comum", clica em um dos botões "cancelar" no card de um horário e confirma a exclusão na caixa de confirmação exibida.  

**Resultado esperado**: o agendamento é cancelado e imediatamente removido da lista de agendamentos. O agendamento volta imediatamente a aparecer como disponível no perfil do(a) profissional que o disponibilizou.

**Resultado obtido**: conforme o esperado.

### 10. cancelar horário agendado (como profissional)

### a) o(a) usuário(a) acessa a página "perfil profissional", clica em um dos botões "cancelar" no card de um horário e confirma a exclusão na caixa de confirmação exibida..  

**Resultado esperado**: o agendamento é cancelado e imediatamente removido da lista de agendamentos do respectivo cliente. O agendamento volta imediatamente a aparecer como disponível no perfil do(a) profissional que o disponibilizou.

**Resultado obtido**: conforme o esperado.

# Referências

- [Figma – Documentação oficial](https://help.figma.com/)
- [Radix – Documentação](https://www.radix-ui.com/blog/themes-3)

