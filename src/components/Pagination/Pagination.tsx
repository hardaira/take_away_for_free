import React, { useState, useEffect } from "react";
import "./Pagination.scss";
import { useSearchParams } from "react-router-dom";
import {HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight} from "react-icons/hi";
//import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
export const Pagination = ({ products = [], cardsPerPage = 4, onPageChange }) => {
  const totalPages = Math.ceil(products.length / cardsPerPage);

  // const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const visibleCount = 2;
  //const currentPage = Number(searchParams.get("page") || "1");
  const currentPage = Number(searchParams.get("page") || "1");
  useEffect(() => {
    if (onPageChange) {
      const start = (currentPage - 1) * cardsPerPage;
      const end = start + cardsPerPage;
      onPageChange(products.slice(start, end));
    }
  }, [currentPage, products, cardsPerPage, onPageChange]);

  // const goNext = () => {
  //   if (currentPage < totalPages) {
  //     const nextPage = currentPage + 1;
  //     setCurrentPage(nextPage);
  //     setSearchParams({ page: `${nextPage}` });

  //     if (nextPage >= startPage + visibleCount) {
  //       setStartPage((prev) => prev + 1);
  //     }
  //   }
  // };
  const goNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("page", String(nextPage));
        return params;
      });
    }
  };

  // const goBack = () => {
  //   if (currentPage > 1) {
  //     const prevPage = currentPage - 1;
  //     setCurrentPage(prevPage);
  //     setSearchParams({ page: `${prevPage}` });

  //     if (prevPage < startPage) {
  //       setStartPage((prev) => prev - 1);
  //     }
  //   }
  // };
  const goBack = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("page", String(prevPage));
        return params;
      });
    }
  };

  // const goToPage = (page) => {
  //   setCurrentPage(page);
  //   setSearchParams({ page: `${page}` });
  //   if (page < startPage) {
  //     setStartPage(page);
      
  //   } else if (page >= startPage + visibleCount) {
  //     setStartPage(page - visibleCount + 1);
      
  //   }
  // };

  const goToPage = (page: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(page));
      return params;
    });
  };


  const maxVisible = 6;

  const getVisiblePages = () => {
    // If pages fit within limit → show all
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = currentPage - Math.floor(maxVisible / 2);
    let end = currentPage + Math.floor(maxVisible / 2);

    // fix left boundary
    if (start < 1) {
      start = 1;
      end = maxVisible;
    }

    // fix right boundary
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisible + 1;
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };
  // const getVisiblePages = () => {
  //   const pages = [];



  //   for (let i = 0; i < visibleCount; i++) {
  //     const page = startPage + i;
  //     if (page <= totalPages) {
  //       pages.push(page);
  //     }
  //   }

  //   return pages;
  // };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="slider_arrow"
        onClick={goBack}
        disabled={currentPage === 1}
      >
        {/* ← */}
        {/* Prev */}
        <HiOutlineArrowNarrowLeft />
      </button>

      {getVisiblePages().map((page) => (
        <button
          key={page}
          className={`single_page ${page === currentPage ? "active" : ""}`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="slider_arrow"
        onClick={goNext}
        disabled={currentPage === totalPages}
      >
        {/* → */}
        {/* Next */}
        <HiOutlineArrowNarrowRight />
      </button>
    </div>
  );
};

export default Pagination;
