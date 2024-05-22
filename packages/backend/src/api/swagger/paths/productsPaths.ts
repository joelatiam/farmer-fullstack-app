export const productsPaths = {
  '/products': {
    get: {
      tags: ['Products'],
      summary: 'List all products',
      description: 'Retrieve a list of products with pagination, sorting, and optional filtering by type.',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          description: 'Maximum number of products to return',
          required: false,
          schema: {
            type: 'integer',
            default: 5
          }
        },
        {
          name: 'offset',
          in: 'query',
          description: 'Number of products to skip for pagination',
          required: false,
          schema: {
            type: 'integer',
            default: 0
          }
        },
        {
          name: 'sortBy',
          in: 'query',
          description: 'Attribute by which returned products are sorted',
          required: false,
          schema: {
            type: 'string',
            enum: ['name', 'id', 'price'],
            default: 'name'
          }
        },
        {
          name: 'sortOrder',
          in: 'query',
          description: 'Direction of sort (ascending or descending)',
          required: false,
          schema: {
            type: 'string',
            enum: ['ASC', 'DESC'],
            default: 'ASC'
          }
        },
        {
          name: 'type',
          in: 'query',
          description: 'Filter products by type (Fertilizer or Seed)',
          required: false,
          schema: {
            type: 'string',
            enum: ['Fertilizer', 'Seed']
          }
        }
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/ProductList'
        },
        '500': {
          $ref: '#/components/responses/ServerError'
        }
      }
    }
  },
  '/products/{productId}/orders': {
    post: {
      tags: ['Products'],
      summary: 'Place an order for a product',
      description: 'Allows a farmer to place an order for a product based on their land size.',
      parameters: [
        {
          name: 'productId',
          in: 'path',
          required: true,
          description: 'The ID of the product to order',
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                quantity: { type: 'number', description: 'Products quantity' },
                email: { type: 'string', format: 'email', description: 'Farmer\'s email' },
                password: { type: 'string', description: 'Farmer\'s password' }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          $ref: '#/components/responses/OrderCreated'
        },
        '400': {
          $ref: '#/components/responses/BadRequest'
        },
        '401': {
          $ref: '#/components/responses/Unauthorized'
        },
        '404': {
          $ref: '#/components/responses/ProductNotFound'
        },
        '500': {
          $ref: '#/components/responses/ServerError'
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    },
    get: {
      tags: ['Products'],
      summary: 'List orders by product ID',
      description: 'Retrieve a list of orders for a specific product with details of the related farmer and product.',
      parameters: [
        {
          name: 'productId',
          in: 'path',
          required: true,
          description: 'ID of the product to fetch orders for',
          schema: {
            type: 'integer',
            example: 1
          }
        },
        {
          name: 'limit',
          in: 'query',
          description: 'Maximum number of products to return',
          required: false,
          schema: {
            type: 'integer',
            default: 5
          }
        },
        {
          name: 'offset',
          in: 'query',
          description: 'Number of products to skip for pagination',
          required: false,
          schema: {
            type: 'integer',
            default: 0
          }
        },
        {
          name: 'sortBy',
          in: 'query',
          description: 'Attribute by which returned products are sorted',
          required: false,
          schema: {
            type: 'string',
            enum: ['id', 'price', 'quantity', 'productUnitPrice'],
            default: 'name'
          }
        },
        {
          name: 'sortOrder',
          in: 'query',
          description: 'Direction of sort (ascending or descending)',
          required: false,
          schema: {
            type: 'string',
            enum: ['ASC', 'DESC'],
            default: 'ASC'
          }
        },
        {
          name: 'status',
          in: 'query',
          description: 'Filter products by type (Fertilizer or Seed)',
          required: false,
          schema: {
            type: 'string',
            enum: ['Pending', 'Approved', 'Failed', 'Rejected']
          }
        }
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/OrderList'
        },
        '404': {
          $ref: '#/components/responses/OrderNotFound'
        },
        '500': {
          $ref: '#/components/responses/ServerError'
        }
      }
    },
  },
  '/products/orders': {
    get: {
      tags: ['Products'],
      summary: 'List all orders',
      description: 'Retrieve a list of all orders with details of the related farmer and product.',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          description: 'Maximum number of products to return',
          required: false,
          schema: {
            type: 'integer',
            default: 5
          }
        },
        {
          name: 'offset',
          in: 'query',
          description: 'Number of products to skip for pagination',
          required: false,
          schema: {
            type: 'integer',
            default: 0
          }
        },
        {
          name: 'sortBy',
          in: 'query',
          description: 'Attribute by which returned products are sorted',
          required: false,
          schema: {
            type: 'string',
            enum: ['id', 'price', 'quantity', 'productUnitPrice'],
            default: 'name'
          }
        },
        {
          name: 'sortOrder',
          in: 'query',
          description: 'Direction of sort (ascending or descending)',
          required: false,
          schema: {
            type: 'string',
            enum: ['ASC', 'DESC'],
            default: 'ASC'
          }
        },
        {
          name: 'status',
          in: 'query',
          description: 'Filter products by type (Fertilizer or Seed)',
          required: false,
          schema: {
            type: 'string',
            enum: ['Pending', 'Approved', 'Failed', 'Rejected']
          }
        }
      ],
      responses: {
        '200': {
          $ref: '#/components/responses/OrderList'
        },
        '500': {
          $ref: '#/components/responses/ServerError'
        }
      }
    }
  },
  '/products/orders/{orderId}': {
    put: {
      tags: ['Products'],
      summary: 'Approve or reject an order',
      description: 'Approve or reject an order. This operation requires the admin password provided in the request body.',
      parameters: [
        {
          name: 'orderId',
          in: 'path',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID of the order'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  enum: ['Approved', 'Rejected'],
                  description: 'New status of the order'
                },
                password: {
                  type: 'string',
                  example: '12345',
                  description: 'Admin password for approval'
                }
              },
              required: ['status', 'password']
            }
          }
        }
      },
      responses: {
        '200': {
          $ref: '#/components/responses/OrderStatusUpdated'
        },
        '400': {
          $ref: '#/components/responses/BadRequest'
        },
        '403': {
          $ref: '#/components/responses/InvalidAdminPassword'
        },
        '404': {
          $ref: '#/components/responses/OrderNotFound'
        },
        '500': {
          $ref: '#/components/responses/ServerError'
        }
      }
    }
  }
};
