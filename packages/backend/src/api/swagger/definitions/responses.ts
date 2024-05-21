export const responses = {
    ProductList: {
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
    OrderList: {
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
    OrderCreated: {
      description: 'Order placed successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Order'
          }
        }
      }
    },
    OrderStatusUpdated: {
      description: 'Order status updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Order status updated successfully'
              }
            }
          }
        }
      }
    },
    BadRequest: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Invalid request parameters'
              }
            }
          }
        }
      }
    },
    Unauthorized: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Unauthorized'
              }
            }
          }
        }
      }
    },
    InvalidAdminPassword: {
      description: 'Invalid admin password',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Invalid admin password'
              }
            }
          }
        }
      }
    },
    ProductNotFound: {
      description: 'Product not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Product not found'
              }
            }
          }
        }
      }
    },
    OrderNotFound: {
      description: 'Order not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Order not found'
              }
            }
          }
        }
      }
    },
    ServerError: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Internal server error'
              }
            }
          }
        }
      }
    }
  };
  