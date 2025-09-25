# E-Commerce Backend (Interview Project)

This project implements a simple e-commerce backend using **NestJS**, **TypeORM**, **MySQL**, and **gRPC**.  
It provides CRUD operations for **Users**, **Products**, and **Orders** via both **REST** and **gRPC** APIs.

---

## ✨ Features

- CRUD for **Users**, **Products**, and **Orders**
- **Order creation logic**:
  - Validates user and product existence
  - Handles duplicate products and computes quantities
  - Computes `totalAmount` using cent-safe arithmetic
  - Defaults `status = CREATED`, with updates to `PAID` and `SHIPPED`
- DTO validation with `class-validator` and `class-transformer`
- **REST controllers** documented with Swagger
- **gRPC services** defined with `.proto` files
- **Unit + E2E tests** for the Users module
- Dockerized setup with MySQL

---

## 📂 Project Structure

```
src/
 ├── common/          # Shared utils, enums, base entities
 ├── modules/
 │   ├── users/       # User entity, service, REST + gRPC controllers
 │   ├── products/    # Product entity, service, REST + gRPC controllers
 │   └── orders/      # Order entity, service, REST + gRPC controllers
 └── main.ts          # App bootstrap (HTTP + gRPC)

proto/
 ├── users.proto
 ├── products.proto
 └── orders.proto
```

---

## 🚀 Running the Project

### Prerequisites
- Node.js v20+
- Docker & Docker Compose

### Local Development (without Docker)
```bash
# install dependencies
npm install

# copy env file
cp .env.example .env

# start app
npm run start:dev
```

### With Docker Compose (recommended)
```bash
docker-compose up --build
```

Services:
- REST API → http://localhost:3000  
- Swagger UI → http://localhost:3000/api  
- gRPC → localhost:50051

---

## 🔧 Environment Variables

Defined in `.env.example` and in `docker-compose.yml`.

| Variable      | Default         | Description         |
|---------------|-----------------|---------------------|
| `NODE_ENV`    | development     | App environment     |
| `PORT`        | 3000            | HTTP port           |
| `GRPC_URL`    | 0.0.0.0:50051   | gRPC bind address   |
| `DB_HOST`     | 127.0.0.1 / db  | Database host       |
| `DB_PORT`     | 3306            | Database port       |
| `DB_USERNAME` | root            | DB username         |
| `DB_PASSWORD` | (empty)         | DB password         |
| `DB_NAME`     | test_ecommerce  | Database name       |

---

## 📘 REST API Examples

### Create a User
```bash
curl -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Parsa","email":"parsa@example.com"}'
```

### Create a Product
```bash
curl -X POST http://localhost:3000/products \
  -H 'Content-Type: application/json' \
  -d '{"name":"Dress","price":14.22}'
```

### Create an Order
```bash
curl -X POST http://localhost:3000/orders \
  -H 'Content-Type: application/json' \
  -d '{"userId":1,"productIds":[1,1,2]}'
```

Swagger UI is available at **http://localhost:3000/api**.

---

## 🎧 gRPC API Examples

Using [`grpcurl`](https://github.com/fullstorydev/grpcurl):

### Create a User
```bash
grpcurl -plaintext -import-path ./proto -proto users.proto \
  -d '{"name":"Parsa","email":"parsa@example.com"}' \
  localhost:50051 users.UsersService/Create
```

### Create a Product
```bash
grpcurl -plaintext -import-path ./proto -proto products.proto \
  -d '{"name":"Dress","price":"14.22"}' \
  localhost:50051 products.ProductsService/Create
```

### Create an Order
```bash
grpcurl -plaintext -import-path ./proto -proto orders.proto \
  -d '{"user_id":1,"product_ids":[1,2]}' \
  localhost:50051 orders.OrdersService/Create
```

---

## 🧪 Testing

Run tests:

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e
```

Covers:
- **Unit**: UserService (duplicate email, pagination, CRUD logic)
- **E2E**: Users REST endpoints with in-memory SQLite

---

## 📜 Notes

- REST and gRPC APIs are consistent with the `.proto` contracts.  
- Errors use proper HTTP codes and NestJS exceptions (`404`, `409`, etc).  
- MySQL 8 via Docker; e2e tests use SQLite in-memory for speed and isolation.  
- Decimal values (`price`, `totalAmount`) handled with cent-safe arithmetic for accuracy.
