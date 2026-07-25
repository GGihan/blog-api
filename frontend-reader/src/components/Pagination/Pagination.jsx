import styles from "./Pagination.module.css";
import Button from "../Button/Button";

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className={`${styles.paginationContainer} flex-row`}>
      {pagination.currentPage > 1 ? (
        <Button
          onClick={() => onPageChange(pagination.currentPage - 1)}
          className={styles.pageButton}
        >
          Previous
        </Button>
      ) : (
        <div className={styles.disabledContainer} aria-hidden="true">
         {/* Make Button dissapear without moving pageIndicator */}
        </div>
      )}

      <div className={styles.pageIndicator}>
        Page {pagination.currentPage} of {pagination.totalPages}
      </div>

      {pagination.hasMore ? (
        <Button
          onClick={() => onPageChange(pagination.currentPage + 1)}
          className={styles.pageButton}
        >
          Next
        </Button>
      ) : (
        <div className={styles.disabledContainer} aria-hidden="true">
          {/* Make Button dissapear without moving pageIndicator */}
        </div>
      )}
    </div> 
  );
};