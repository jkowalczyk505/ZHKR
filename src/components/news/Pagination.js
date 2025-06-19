import React from "react";
import Button from "../Button";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const renderButton = (page, index) => {
    if (page === "...") {
      return (
        <span key={`dots-${index}`} className="dots">
          ...
        </span>
      );
    }

    return (
      <Button
        key={page}
        variant={page === currentPage ? "primary" : "outline"}
        onClick={() => onPageChange(page)}
      >
        {page}
      </Button>
    );
  };

  return (
    <div className="pagination">
      {getPageNumbers().map((page, index) => renderButton(page, index))}

      {currentPage < totalPages && (
        <Button variant="outline" onClick={() => onPageChange(currentPage + 1)}>
          &gt;
        </Button>
      )}
    </div>
  );
}

export default Pagination;
