import React, { FC } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';


import { cn } from "@/lib/utils";
import styles from './index.module.scss';

interface Props {
    totalItems: number;
    itemsPerPage: number;
    skipCount: number;
    currentPage: number;
    isLoading?: boolean;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (perPage: number) => void;
}

const Pagination:FC<Props> = ({
    totalItems,
    itemsPerPage,
    skipCount,
    currentPage,
    isLoading,
    onPageChange,
    onItemsPerPageChange,
}) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const itemsPerPageOptions = [5, 10, 20, 50, 100];
    const getShowCount = () => skipCount + itemsPerPage > totalItems ? totalItems : skipCount + itemsPerPage;

    const handlePreviousPage = () => {
        if (currentPage > 1)
            onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages)
            onPageChange(currentPage + 1);
    };

    const handlePageClick = (page: any) => {
        if (page !== currentPage)
            onPageChange(page);
    };


    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 5; // The maximum number of page buttons to display

        if (totalPages <= maxPageNumbersToShow) {
            // Show all page numbers if total pages are less than or equal to maxPageNumbersToShow

            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`${styles.paginationButton} ${i === currentPage ? styles.paginationActive : ""}`}
                        onClick={() => handlePageClick(i)}
                    >{i}</button>
                );
            }
        } else {
            // If total pages are more than maxPageNumbersToShow, show ellipsis
            const leftSide = Math.max(2, currentPage - 1);
            const rightSide = Math.min(totalPages - 1, currentPage + 1);

            pageNumbers.push(
                <button
                    key={1}
                    className={`${styles.paginationButton} ${currentPage === 1 ? styles.paginationActive : ""}`}
                    onClick={() => handlePageClick(1)}
                >1</button>
            );

            if (leftSide > 2) {
                pageNumbers.push(<span key="left-ellipsis" className={ styles.paginationEllipsis }>...</span>);
            }

            for (let i = leftSide; i <= rightSide; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`${styles.paginationButton} ${i === currentPage ? styles.paginationActive : ""}`}
                        onClick={() => handlePageClick(i)}
                    >{i}</button>
                );
            }

            if (rightSide < totalPages - 1) {
                pageNumbers.push(<span key="right-ellipsis" className={ styles.paginationEllipsis }>...</span>);
            }

            pageNumbers.push(
                <button
                    key={totalPages}
                    className={`${styles.paginationButton} ${currentPage === totalPages ? styles.paginationActive : ""}`}
                    onClick={() => handlePageClick(totalPages)}
                >{totalPages}</button>
            );
        }

        return pageNumbers;
    };


    return (
        <div className={ cn(
            styles.pagination,
            isLoading && 'opacity-50 pointer-events-none',
        )}>

            <div className={ styles.paginationInfo }>
                {/* <p>Showing  {itemsPerPage} of {totalItems} items</p> */}
                <p>Showing {skipCount + 1} to {getShowCount()} of {totalItems} items</p>
            </div>

            <div className={ styles.paginationItemsCount }>
                <p>Items per page</p>
                <select
                    className={`${styles.paginationItemsCountSelect}`}
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                >
                    {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className={ styles.paginationButtons }>
                <button
                    className={`${styles.paginationButton}`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft size={18} />
                </button>

                { renderPageNumbers() }

                <button
                    className={`${styles.paginationButton}`}
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
                >
                    <ChevronRight size={18} />
                </button>
            </div>

        </div>
    );
};

export default Pagination;
