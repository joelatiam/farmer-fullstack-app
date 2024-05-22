# Backend Service

This is the backend service for the project, built using Node(Express, Typescript) and Postgres.

## Technologies

- Node.js
- Express
- Typescript
- Sequelize
- PostgreSQL
- Jest for testing
- Swagger/OpenAPI for Documentations

## Getting Started

### Environment Setup

Copy the `.env.example` file to a `.env` and update the environment variables to fit your setup:

```bash
cp .env.example .env
```

### Installation and Migrations

```bash
 yarn workspace @services/api  install
 yarn workspace @services/api  db:migrate
 yarn workspace @services/api  db:seed:all
```

### Running

```bash
 yarn workspace @services/api  start:dev  # Development
 yarn workspace @services/api  build #Prod
 yarn workspace @services/api  start #Prod
```

## Data Dictionary

### Farmers
- `id` (Integer): Primary Key, auto-increment.
- `name` (String): Farmer's name.
- `landSize` (Number): Size of the land owned by the farmer.
- `email` (String): Email address, must be unique.
- `password` (String): Hashed password for the farmer's account.
- `walletBalance` (Decimal): Financial balance in the farmer's wallet.

### Products
- `id` (Integer): Primary Key, auto-increment.
- `name` (String): Name of the product.
- `type` (Enum ['Fertilizer', 'Seed']): Type of the product.
- `price` (Decimal): Price of the product.
- `weightInKg` (Decimal): Weight of the product in kilograms.

### Orders
- `id` (Integer): Primary Key, auto-increment.
- `farmerId` (Integer): Foreign Key linking to Farmers.
- `productId` (Integer): Foreign Key linking to Products.
- `quantity` (Integer): Quantity of the product ordered.
- `status` (Enum ['Pending', 'Approved', 'Rejected', 'Failed']): Status of the order.

### Transactions
- `id` (Integer): Primary Key, auto-increment.
- `orderId` (Integer): Foreign Key linking to Orders.
- `farmerId` (Integer): Foreign Key linking to Farmers.
- `productId` (Integer): Foreign Key linking to Products.
- `amount` (Decimal): Total amount of the transaction.
- `type` (Enum): Type of the transaction, derived from predefined transaction types (e.g., Purchase, Refund).
