# xpe-software-architecture-final-challenge

Final challenge module for XPE software architecture post graduation studies.

This is a simple E-Commerce API built using **Node.js**, **Express**, **TypeScript**, **Prisma**, and follows the **MVC architecture**. The application manages **clients**, **products**, **orders**, and **orderItems**.

## Features

- **Clients**: Manage customer information with full CRUD (Create, Read, Update, Delete) operations.
- **Products**: Manage product details with full CRUD operations.
- **Orders**: Handle customer orders, with full CRUD operations.
- **Order Items**: Manage individual items within an order, with full CRUD operations.
  - **Order Items** have **relations to Orders** and **Products**, ensuring each item is linked to a specific order and product.

## Tech Stack

- **Node.js**: JavaScript runtime for building scalable applications.
- **Express**: Web framework for Node.js.
- **TypeScript**: JavaScript superset for static typing.
- **Prisma**: ORM for database access.
- **PostgreSQL (or your preferred database)**: Used as the database for storing data.
- **Supabase**: Used to manage database persistence, though any PostgreSQL instance can be used.

## Installation

### 1. Clone the repository

```bash
git clone git@github.com:PhilipLages/xpe-software-architecture-final-challenge.git
cd xpe-software-architecture-final-challenge
```

### 2. Install dependencies

```bash
yarn
```

### 3. Seed the database

```bash
yarn seed
```

### 4. Generate Prisma Client

```bash
yarn prisma generate
```

### 5. Run the app

```bash
yarn dev
```

### 6. Use a API development tool such as [Postman](https://www.postman.com/) to test the requests.

### 7. Endpoints documentation can be found [here](http://localhost:3000/docs), by running the app.
