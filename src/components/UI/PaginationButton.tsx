import styles from './PaginationButton.module.css';
import { useStore } from '../../models/RootStore';

type Props = {
  totalPages: number;
  pageNumber: number;
  currentPage: number;
  setCurrentPage: Function;
};

const PaginationButton = ({
  totalPages,
  pageNumber,
  setCurrentPage,
  currentPage,
}: Props) => {
  const rootStore = useStore();

  let showButton =
    pageNumber > currentPage + 3 || pageNumber < currentPage - 2
      ? ''
      : styles.showButton;

  if (currentPage < 3) {
    showButton = pageNumber <= 6 ? styles.showButton : '';
  }
  if (currentPage > totalPages - 3) {
    showButton = pageNumber >= totalPages - 4 ? styles.showButton : '';
  }

  return (
    <button
      className={`${styles.wrapper} ${
        pageNumber === currentPage ? styles.current : ''
      } 
      
      ${showButton}`}
      onClick={() => {
        setCurrentPage(pageNumber - 1);
      }}
    >
      {pageNumber}
    </button>
  );
};

export default PaginationButton;
