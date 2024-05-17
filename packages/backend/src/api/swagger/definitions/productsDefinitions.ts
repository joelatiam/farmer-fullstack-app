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
    }
  };
  