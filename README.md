
## Estrutura do projeto

- app.js - onde  começa o express
- index.routes.js - onde é importado todas as rotas dos módulos
- /bin - onde dá o start do projeto
- /config - serve para configurações da aplicação, variáveis de ambiente etc
- /modules - modulos da aplicação

### Módulos

Um módulo é composto de:
- modulo.controller.js - receber as requisições HTTP e processar utilizando os services
- modulo.routes.js - direcionar as requisições
- modulo.service.js - comunicar com o banco, tem regras de negócio e é utilizado pelos controllers
- /entities - Formato dos objetos que irão ser armazenados no banco de dados
- /entities/modulo.entity.js - exemplo de uma entidade


### Banco de dados

O banco de dados é o MongoDB


Obs, importar os arquivos e adicionar o .js, exemplo 
'import indexRouter from './index.routes.js';'