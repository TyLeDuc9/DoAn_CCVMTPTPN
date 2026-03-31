import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationWrapper: React.FC<PaginationWrapperProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationPrevious
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      />
      <PaginationContent>
        {pages.map((p, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={p === currentPage}
              onClick={() => onPageChange(p)}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
      <PaginationNext
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      />
    </Pagination>
  );
};