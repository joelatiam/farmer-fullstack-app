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
    }
  };
  