export interface ListQuery {
    limit: number;
    offset: number;
    sortBy: string;
    sortOrder: 'ASC' | 'DESC';
    type?: string;
    status?: string;
  }
