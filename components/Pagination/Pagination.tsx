import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={handlePageChange}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextLinkClassName={css.pageLink}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;

