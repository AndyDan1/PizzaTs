import React, {memo} from 'react';
import ReactPaginate from 'react-paginate';
import classes from './styles.module.scss';

interface IPagination {
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<IPagination> = ({currentPage, onChangePage}) => {

  return (
    <ReactPaginate
      className={classes.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={e => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
};

export default memo(Pagination);