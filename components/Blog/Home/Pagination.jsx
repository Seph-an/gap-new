import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pagination = {}, filter = "all" }) => {
  const page = Number(pagination.page) || 1;
  const pageCount = Number(pagination.pageCount) || 1;
  if (pageCount <= 1) return null;

  const basePath = filter === "all" ? "/blog" : `/blog/category/${encodeURIComponent(filter)}`;
  const makeHref = (pageNumber) => pageNumber === 1 ? basePath : `${basePath}/page/${pageNumber}`;
  const linkClass = "grid min-h-11 min-w-11 place-content-center rounded-lg font-semibold transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_22px_rgba(81,212,214,0.35)] active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]";

  return (
    <nav aria-label="Blog pagination" className="my-10 flex flex-col items-center gap-4 sm:my-14">
      <p className="text-sm text-gray-400">Page {page} of {pageCount}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {page > 1 && <Link href={makeHref(page - 1)} aria-label="Previous blog page" className={`${linkClass} bg-[#51D4D6] text-[#0a0a0a]`}><ChevronLeft size={20} /></Link>}
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <Link key={pageNumber} href={makeHref(pageNumber)} aria-label={`Blog page ${pageNumber}`} aria-current={pageNumber === page ? "page" : undefined} className={`${linkClass} ${pageNumber === page ? "bg-[#51D4D6] text-[#0a0a0a]" : "bg-gray-300 text-[#0a0a0a] hover:bg-white"}`}>{pageNumber}</Link>)}
        {page < pageCount && <Link href={makeHref(page + 1)} aria-label="Next blog page" className={`${linkClass} bg-[#51D4D6] text-[#0a0a0a]`}><ChevronRight size={20} /></Link>}
      </div>
    </nav>
  );
};

export default Pagination;
