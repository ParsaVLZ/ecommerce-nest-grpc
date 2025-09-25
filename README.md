# E-Commerce Backend (Interview Project)

My test interview project, implements a simple e-commerce backend using **NestJS**, **TypeORM**, **MySQL**, and **gRPC**.  
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

## Running the Project

### Prerequisites
- Node.js v20+
- Docker & Docker Compose

### Local Dev (without Docker)
```bash
# install dependencies
npm install

# copy env file
cp .env

# run migrations and start app
npm run start:dev

