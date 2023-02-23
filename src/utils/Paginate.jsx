const Paginate = (data) => {
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const newList = Array.from({ length: totalPages }, (_, index) => {
    const start = itemsPerPage * index;
    return data.slice(start, start + itemsPerPage);
  });
  return newList;
};
export default Paginate;
