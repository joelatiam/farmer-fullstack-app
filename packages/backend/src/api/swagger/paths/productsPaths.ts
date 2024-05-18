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
            description: 'A list of products',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Product'
                      }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Server error'
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
                  email: { type: 'string', format: 'email', description: 'Farmer\'s email' },
                  password: { type: 'string', description: 'Farmer\'s password' }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Order placed successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request'
          },
          '401': {
            description: 'Unauthorized'
          },
          '404': {
            description: 'Product not found'
          },
          '500': {
            description: 'Server Error'
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
            description: 'A list of orders',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      quantity: { type: 'integer', example: 10 },
                      status: { type: 'string', example: 'Pending' },
                      farmer: {
                        $ref: '#/components/schemas/Farmer'
                      },
                      product: {
                        $ref: '#/components/schemas/Product'
                      }
                    }
                  }
                }
              }
            }
          },
          '404': { description: 'No orders found for this product' },
          '500': { description: 'Internal server error' }
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
            description: 'A list of orders',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      quantity: { type: 'integer', example: 10 },
                      status: { type: 'string', example: 'Pending' },
                      farmer: {
                        $ref: '#/components/schemas/Farmer'
                      },
                      product: {
                        $ref: '#/components/schemas/Product'
                      }
                    }
                  }
                }
              }
            }
          },
          '500': { description: 'Internal server error' }
        }
      }
    },
  };
  