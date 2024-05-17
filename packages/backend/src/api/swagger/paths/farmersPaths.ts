export const farmersPaths = {
    '/farmers/signup': {
      post: {
        tags: ['Farmers'],
        summary: 'Register a new farmer',
        description: 'This endpoint allows for registering a new farmer.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'landSize', 'email', 'password'],
                properties: {
                  name: {
                    type: 'string',
                    example: 'John Doe'
                  },
                  landSize: {
                    type: 'number',
                    example: 120
                  },
                  email: {
                    type: 'string',
                    example: 'johndoe@example.com'
                  },
                  password: {
                    type: 'string',
                    example: 'securePassword123'
                  },
                  walletBalance: {
                    type: 'number',
                    example: 1000
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Farmer'
                }
              }
            }
          },
          '409': {
            description: 'Email already in use'
          }
        }
      }
    }
  };
