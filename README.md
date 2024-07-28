
---

# Articles API

Articles API is a RESTful API built with Node.js, Express, and MongoDB. It provides endpoints for managing articles, categories, and user authentication.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RazElbaz/NodeExpressAPI.git
   cd NodeExpressAPI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add MongoDB connection URI:
     ```
     MONGO_USERNAME=<your_mongo_username>
     MONGO_PASSWORD=<your_mongo_password>
     ```

   - Add JWT secret key:
     ```
     JWT_KEY=<your_jwt_secret_key>
     ```

4. Start the server:
   ```bash
   npm start
   ```

   The server will start running at `http://localhost:3000`.

## API Endpoints

### Articles

- `GET /articles`: Get all articles
- `GET /articles/:articleId`: Get a specific article
- `POST /articles`: Create a new article (requires authentication)
- `PATCH /articles/:articleId`: Update an article (requires authentication)
- `DELETE /articles/:articleId`: Delete an article (requires authentication)

### Categories

- `GET /categories`: Get all categories
- `POST /categories`: Create a new category
- `GET /categories/:categoryId`: Get a specific category
- `PATCH /categories/:categoryId`: Update a category
- `DELETE /categories/:categoryId`: Delete a category

### Users

- `POST /users/signup`: Create a new user
- `POST /users/login`: User login

## Middlewares

- `checkAuth`: Middleware to check if the request has a valid JWT token for authentication.
- `upload`: Middleware for handling file uploads (limited to JPEG and PNG images).

## Error Handling

The API handles errors gracefully with appropriate HTTP status codes and error messages.

#### Examples

##### Articles API

##### Get All Articles

Endpoint to retrieve all articles.

**Request:**
- Method: GET
- URL: `http://localhost:3000/articles`

**Example Usage:**
```bash
curl -X GET http://localhost:3000/articles
```

##### Get Article by ID

Endpoint to retrieve a specific article by its ID.

**Request:**
- Method: GET
- URL: `http://localhost:3000/articles/6683a46a809bb9bdf8319ce5`

**Example Usage:**
```bash
curl -X GET http://localhost:3000/articles/6683a46a809bb9bdf8319ce5
```

##### Create Article

Endpoint to create a new article.

**Request:**
- Method: POST
- URL: `http://localhost:3000/articles`
- Headers:
  - Authorization: Bearer \<your_access_token\>

- Body:
  ```json
  {
    "title": "New Article",
    "description": "This is a new article.",
    "content": "Article with image content",
    "categoryId": "6683a18a1040b4ccfb4478d4",
    "image": "<file_path>"
  }
  ```

**Example Usage:**
```bash
curl -X POST -H "Authorization: Bearer <your_access_token>" -d 'title=New Article&description=This is a new article.&content=Article with image content&categoryId=6683a18a1040b4ccfb4478d4&image=<file_path>' http://localhost:3000/articles
```

##### Update Article

Endpoint to update an existing article by its ID.

**Request:**
- Method: PATCH
- URL: `http://localhost:3000/articles/6683a509809bb9bdf8319cf8`
- Headers:
  - Authorization: Bearer \<your_access_token\>

- Body:
  ```json
  {
    "title": "Updated Article"
  }
  ```

**Example Usage:**
```bash
curl -X PATCH -H "Authorization: Bearer <your_access_token>" -d '{"title": "Updated Article"}' http://localhost:3000/articles/6683a509809bb9bdf8319cf8
```

##### Delete Article

Endpoint to delete an article by its ID.

**Request:**
- Method: DELETE
- URL: `http://localhost:3000/articles/6683a509809bb9bdf8319cf8`
- Headers:
  - Authorization: Bearer \<your_access_token\>

**Example Usage:**
```bash
curl -X DELETE -H "Authorization: Bearer <your_access_token>" http://localhost:3000/articles/6683a509809bb9bdf8319cf8
```

##### Categories API

##### Get All Categories

Endpoint to retrieve all categories.

**Request:**
- Method: GET
- URL: `http://localhost:3000/categories`

**Example Usage:**
```bash
curl -X GET http://localhost:3000/categories
```

##### Create Category

Endpoint to create a new category.

**Request:**
- Method: POST
- URL: `http://localhost:3000/categories`
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer \<your_access_token\>

- Body:
  ```json
  {
    "title": "New Category",
    "description": "This is a new category."
  }
  ```

**Example Usage:**
```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_access_token>" -d '{"title": "New Category", "description": "This is a new category."}' http://localhost:3000/categories
```

##### Update Category

Endpoint to update an existing category by its ID.

**Request:**
- Method: PATCH
- URL: `http://localhost:3000/categories/6683bc889d7a0ff6e3ba52b5`
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer \<your_access_token\>

- Body:
  ```json
  {
    "title": "Updated Category"
  }
  ```

**Example Usage:**
```bash
curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer <your_access_token>" -d '{"title": "Updated Category"}' http://localhost:3000/categories/6683bc889d7a0ff6e3ba52b5
```

##### Delete Category

Endpoint to delete a category by its ID.

**Request:**
- Method: DELETE
- URL: `http://localhost:3000/categories/6683bc889d7a0ff6e3ba52b5`
- Headers:
  - Authorization: Bearer \<your_access_token\>

**Example Usage:**
```bash
curl -X DELETE -H "Authorization: Bearer <your_access_token>" http://localhost:3000/categories/6683bc889d7a0ff6e3ba52b5
```

##### User Authentication

##### User Signup

Endpoint to register a new user.

**Request:**
- Method: POST
- URL: `http://localhost:3000/users/signup`
- Body:
  ```json
  {
    "email": "example@gmail.com",
    "password": "123456"
  }
  ```

**Example Usage:**
```bash
curl -X POST -d '{"email": "example@gmail.com", "password": "123456"}' http://localhost:3000/users/signup
```

##### User Login

Endpoint to authenticate and log in a user.

**Request:**
- Method: POST
- URL: `http://localhost:3000/users/login`
- Body:
  ```json
  {
    "email": "example@gmail.com",
    "password": "123456"
  }
  ```

**Example Usage:**
```bash
curl -X POST -d '{"email": "example@gmail.com", "password": "123456"}' http://localhost:3000/users/login
```
---
