export function paginate(items, currentPage, pageSize = 10) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const page = Math.min(Math.max(currentPage, 1), totalPages);

  const startIndex = (page - 1) * pageSize;

  const paginatedItems = items.slice(startIndex, startIndex + pageSize);

  return {
    items: paginatedItems,
    currentPage: page,
    totalPages,
  };
}
