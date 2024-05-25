export interface Paginated<T> {
  data: T[];
  page: number;
  total: number;
}

export const paginator = <T>(
  items: T[],
  page?: number,
  limit?: number
): Paginated<T> => {
  if (!page) page = 1;
  if (!limit) limit = 20;

  const offset = (page - 1) * limit;
  const paginatedItems = items.slice(offset, offset + limit);
  const total = items.length;

  return {
    data: paginatedItems,
    page,
    total,
  };
};
