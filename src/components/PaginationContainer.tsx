import PaginationButton from './UI/PaginationButton';

type Props = {
  setCurrentPage: Function;
  currentPage: number;
  totalPages: number;
};

const PaginationContainer = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: Props) => {
  const pages = [];

  for (let i = 0; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <>
      {currentPage > 3 ? '... ' : `${'\u00A0'}${'\u00A0'}`}
      {pages.map((page) => (
        <PaginationButton
          key={page}
          totalPages={totalPages}
          pageNumber={page + 1}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      ))}
      {currentPage <= totalPages - 3 && ' ...'}
    </>
  );
};

export default PaginationContainer;
