# E-Commerce Backend (Interview Project)

In This we implemented a simple e-commerce backend using **NestJS**, **TypeORM**, **MySQL**, and **gRPC**.  
It provides CRUD operations for **Users**, **Products**, and **Orders** via both **REST** and **gRPC** APIs.

---

## Features

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

## NOTE: TypeORM Schema Sync

For local development in this interview project, TypeORM is configured with **`synchronize: true`** to auto-create/update tables.

> **We Do not use `synchronize: true` in production.**  
> In production set **`synchronize: false`** and manage schema changes with **TypeORM migrations** to prevent accidental data loss.

---

## Running the Project

### Prerequisites
- Node.js v20+
- Docker & Docker Compose

### Local Development (without Docker)
```bash
# install dependencies
npm install

# copy env file
cp .env

# start app
npm run start:dev
```

### With Docker Compose
```bash
docker-compose up --build
```

Services:
- REST API → http://localhost:3000  
- Swagger UI → http://localhost:3000/api  
- gRPC → localhost:50051

---


## gRPC — How to Test Manually (with `grpcurl`)

**Protos** are in: `src/grpc/proto/{users.proto, products.proto, orders.proto}`

**Assumptions for the examples below**
- Server is running at `localhost:50051`
- You run commands from the project root
- You have [`grpcurl`](https://github.com/fullstorydev/grpcurl) installed
- Always include `-import-path src/grpc/proto` so grpcurl can resolve protos

> **Notes**
> - In `products.proto`, the `price` field is a **string** (e.g., `"49.50"`); the server parses/validates it.
> - The Orders gRPC controller accepts **both** snake_case (`user_id`, `product_ids`) and camelCase (`userId`, `productIds`) inputs.

### Users

**Create**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto users.proto \
  -d '{"name":"Parsa","email":"parsa@yahoo.com"}' \
  localhost:50051 users.UsersService/Create
~~~

**FindAll**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto users.proto \
  -d '{"page":1,"limit":10}' \
  localhost:50051 users.UsersService/FindAll
~~~

**FindOne**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto users.proto \
  -d '{"id":1}' \
  localhost:50051 users.UsersService/FindOne
~~~

**Update**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto users.proto \
  -d '{"id":1,"name":"Parsa Renamed name"}' \
  localhost:50051 users.UsersService/Update
~~~

**Remove**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto users.proto \
  -d '{"id":1}' \
  localhost:50051 users.UsersService/Remove
~~~

### Products

**Create**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto products.proto \
  -d '{"name":"Dress","price":"14.22"}' \
  localhost:50051 products.ProductsService/Create
~~~

**FindAll**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto products.proto \
  -d '{"page":1,"limit":10}' \
  localhost:50051 products.ProductsService/FindAll
~~~

**FindOne**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto products.proto \
  -d '{"id":1}' \
  localhost:50051 products.ProductsService/FindOne
~~~

**Update**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto products.proto \
  -d '{"id":1,"price":"55.00"}' \
  localhost:50051 products.ProductsService/Update
~~~

**Remove**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto products.proto \
  -d '{"id":1}' \
  localhost:50051 products.ProductsService/Remove
~~~

### Orders

> **Precondition:** Create a **user** and **products** first; use their returned IDs below.

**Create** (duplicates to test quantity calculation)
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto orders.proto \
  -d '{"user_id":1,"product_ids":[1,1,2]}' \
  localhost:50051 orders.OrdersService/Create
~~~

**FindAll**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto orders.proto \
  -d '{"page":1,"limit":10}' \
  localhost:50051 orders.OrdersService/FindAll
~~~

**FindOne**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto orders.proto \
  -d '{"id":1}' \
  localhost:50051 orders.OrdersService/FindOne
~~~

**UpdateStatus** (`0=CREATED`, `1=PAID`, `2=SHIPPED`)
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto orders.proto \
  -d '{"id":1,"status":1}' \
  localhost:50051 orders.OrdersService/UpdateStatus
~~~

**Remove**
~~~bash
grpcurl -plaintext -import-path src/grpc/proto -proto orders.proto \
  -d '{"id":1}' \
  localhost:50051 orders.OrdersService/Remove
~~~

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
