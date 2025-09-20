# Express Database First - REST API

A REST API developed with Express.js using a "Database First" approach with Sequelize ORM and PostgreSQL.


## 

This application is a REST API that manages a system of authors and books. It uses a "Database First" approach where Sequelize models are automatically generated from an existing PostgreSQL database.

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **Sequelize** - ORM for Node.js
- **PostgreSQL** - Relational database
- **dotenv** - Environment variable management
- **Nodemon** - Automatic reload in development

## Architecture

The project follows a structured layered architecture:

```
Express_dbfirst/
├── app.js                 # Application entry point
├── package.json           # Dependencies and scripts
├── controller/            # Controllers for routing logic
│   ├── author.controller.js
│   └── book.controller.js
├── middleware/            # Custom middlewares
│   ├── error.js
│   └── logger.js
├── models/                # Sequelize models auto-generated
│   ├── author.js
│   ├── book.js
│   ├── index.js
│   └── init-models.js
├── repository/            # Data access layer
│   ├── authors.repository.js
│   └── books.repository.js
├── responses/             # Standardized response models
│   ├── apiCallResult.js
│   └── serviceCallResult.js
├── routes/                # Route definitions
│   ├── authors.routes.js
│   └── books.routes.js
├── service/               # Business logic
│   ├── authors.service.js
│   └── books.service.js
└── utils/                 # Utilities
    ├── serviceStatus.enum.js
    └── statusToHttpCode.js
```

##  Installation


1. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   - Create a PostgreSQL database
   - Configure the required tables (authors and books)

## Configuration

1. **Create a `.env` file** at the root of the project:
   ```env
   # Database configuration
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_USER=your_username
   DB_PASSWORD=your_password
   
   # Server configuration
   PORT=3000
   ```

2. **Generate Sequelize models** (if necessary):
   ```bash
   npx sequelize-auto -o "./models" -d your_database_name -h localhost -u your_username -p 5432 -x your_password -e postgres
   ```

### Development start
```bash
npm run dev
```

### Production start
```bash
npm start
```

## API Endpoints

### Authors (`/authors`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/authors` | Retrieve all authors |
| GET    | `/authors/:id` | Retrieve an author by ID |
| POST   | `/authors` | Create a new author |
| PUT    | `/authors/:id` | Update an author |
| DELETE | `/authors/:id` | Delete an author |

### Books (`/books`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/books` | Retrieve all books |
| GET    | `/books/:id` | Retrieve a book by ID |
| POST   | `/books` | Create a new book |
| PUT    | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

### Request Examples

#### Create an author
```bash
POST /authors
Content-Type: application/json

{
  "name": "Victor Hugo",
  "email": "victor.hugo@example.com",
  "birth_date": "1802-02-26"
}
```

#### Create a book
```bash
POST /books
Content-Type: application/json

{
  "title": "Les Misérables",
  "isbn": "978-2-07-036194-1",
  "publication_date": "1862-03-30",
  "author_id": 1
}
```




