export const farmerDefinitions = {
    Farmer: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          example: 1
        },
        name: {
          type: 'string',
          example: 'John D'
        },
        landSize: {
          type: 'number',
          example: 120
        },
        email: {
          type: 'string',
          example: 'johnd@example.com'
        },
        password: {
          type: 'string',
          example: 'password123'
        },
        walletBalance: {
          type: 'number',
          example: 1000
        }
      }
    }
  };
