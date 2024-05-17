export const productsDefinitions = {
    Product: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64', example: 1 },
        name: { type: 'string', example: 'Premium Fertilizer' },
        type: { type: 'string', example: 'Fertilizer', enum: ['Fertilizer', 'Seed'] },
        price: { type: 'number', format: 'float', example: 19.99 },
        weightInKg: { type: 'number', format: 'float', example: 50 }
      }
    },
    Order: {
        type: 'object',
        required: ['productId', 'quantity'],
        properties: {
          id: { type: 'integer', example: 1 },
          farmerId: { type: 'integer', example: 1 },
          productId: { type: 'integer', example: 1 },
          quantity: { type: 'number', example: 10 },
          status: { type: 'string', enum: ['Pending', 'Approved', 'Rejected', 'Failed'], example: 'Pending' }
        }
      },
  };
  