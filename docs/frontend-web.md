# Front-end Web

O **EasyBook** é uma plataforma de agendamento desenvolvida para profissionais do setor de beleza e autocuidado, como cabeleireiros e esteticistas. Esta etapa do projeto foca no desenvolvimento da **interface web**, proporcionando uma experiência visual clara, intuitiva e acessível aos usuários.

## Projeto da Interface Web

A interface Web permite que clientes realizem agendamentos de forma prática e rápida, ao mesmo tempo em que os profissionais podem visualizar e organizar seus horários com facilidade. O front-end é projetado com foco em usabilidade e integração fluida com a API da aplicação.

Com isso, o EasyBook melhora significativamente a experiência do usuário final, contribui para a fidelização dos clientes e auxilia no crescimento dos microempreendedores ao reduzir erros e conflitos na agenda.

Este projeto de front-end contempla o desenvolvimento completo da camada visual da aplicação, incluindo:

### Wireframes 

#### [Easybook no Figma](https://www.figma.com/design/juU3fxkgVJXXccndVplkDl/EasyBook--Copy-?node-id=2001-3&m=draw)

#### > *Wireframe da tela de login da aplicação.*
![Tela login](./img/wireframe-login.jpeg)  

#### > *Wireframe da tela de cadastro da aplicação.*
![Tela home](./img/wireframe-cadastro.jpeg) 

#### > *Wireframe da tela inicial do profissional da aplicação.*
![Tela home](./img/wireframe-profissional.jpeg) 

#### > *Wireframe da tela inicial do cliente da aplicação.*
![Tela home](./img/wireframe-cliente.jpeg)

#### > *Wireframe da tela de edição de agenda da aplicação.*
![Tela agenda](./img/wireframe-agenda.jpeg)   

#### > *Wireframe da tela de editar perfil da aplicação.*
![Tela home](./img/wireframe-perfil.jpeg)  


### Design Visual
O design da aplicação foi definido com os seguintes elementos visuais:

- **Paleta de cores:** Roxo `#8B5CF6` (primária), Branco `#F3F4F6`, Cinza `#6B7280`, Vermelho `#EF4444` e Verde `#10B981`
- **Tipografia:** Fonte principal: *Inter*, secundária: *Arial*.
- **Estilo:** Minimalista, com foco em clareza e hierarquia visual.

## Fluxo de Dados

### Cadastro de Usuário (Cliente ou Servidor)

- Frontend (HTML/JS):

Usuário preenche o formulário (nome, e-mail, senha etc.)

Ao clicar em Cadastrar-se, o frontend faz uma requisição POST /api/cadastro.

- Backend (ASP.NET Core):

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
- JavaScript, HTML, CSS

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

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

# Referências

- [Figma – Documentação oficial](https://help.figma.com/)
- [Radix – Documentação](https://www.radix-ui.com/blog/themes-3)

