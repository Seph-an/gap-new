import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const chevColor = "#0a0a0a";
const chevSize = 20;
const chevWidth = 2;

const Pagination = ({ pagination, filter }) => {
  const { page, pageCount } = pagination;
  // const filter = filter;
  const filterApplied = `filter=${filter}&`;

  return (
    <div>
      {pageCount > 1 && (
        <div className="my-6 md:my-12 lg:my-16 flex gap-3 ">
          {/* Previous button */}
          {page > 1 && (
            <Link
              href={
                page > 1
                  ? `/blog?${filter ? filterApplied : ""}page=${page - 1}`
                  : ""
              }
              className={`w-8 h-8 grid place-content-center rounded-[0.325rem] ${
                page > 1 ? "bg-[#51D4D6] shadow-sm" : "bg-gray-300"
              } px-3 py-1`}
            >
              <ChevronLeft
                color={chevColor}
                size={chevSize}
                strokeWidth={chevWidth}
              />
            </Link>
          )}
          {/* The pagination buttons */}
          {Array.from({ length: pageCount }, (_, index) => (
            <Link
              href={`/blog?${filter ? filterApplied : ""}page=${index + 1}`}
              key={index}
              className={`w-8 h-8 grid place-content-center rounded-[0.325rem]  ${
                index + 1 === page ? "bg-[#51D4D6]" : "bg-gray-300 shadow-sm"
              } text-[#0a0a0a] text-base px-3 py-1`}
            >
              {index + 1}
            </Link>
          ))}
          {/* Next button*/}

          {page < pageCount && (
            <Link
              href={
                pageCount > 1 && page < pageCount
                  ? `/blog?${filter ? filterApplied : ""}page=${page + 1}`
                  : ""
              }
              className={`w-8 h-8 grid place-content-center rounded-[0.325rem] ${
                pageCount < 2 || page === pageCount
                  ? "bg-gray-300"
                  : " bg-[#51D4D6] shadow-sm"
              } px-3 py-1`}
            >
              <ChevronRight
                color={chevColor}
                size={chevSize}
                strokeWidth={chevWidth}
              />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Pagination;
