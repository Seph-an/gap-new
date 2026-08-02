import Link from "next/link";

const baseClass = "inline-flex min-h-11 items-center rounded-lg px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]";

const Filter = ({ filter = "all", categories = [] }) => {
  const activeFilter = decodeURIComponent(filter).toLowerCase();
  const options = [{ Title: "All", Filter: "All articles", href: "/blog" }, ...categories.map((category) => ({ ...category, href: `/blog/category/${encodeURIComponent(category.Title)}` }))];

  return (
    <nav aria-label="Filter blog posts by topic">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gray-400">Filter by topic</p>
      <div className="flex flex-wrap gap-2">
        {options.map((category) => {
          const active = category.Title.toLowerCase() === (activeFilter === "all" ? "all" : activeFilter);
          return <Link key={category.Title} href={category.href} aria-current={active ? "page" : undefined} className={`${baseClass} ${active ? "bg-[#51D4D6] text-[#0a0a0a]" : "bg-white/90 text-[#1e1e1e] hover:bg-white"}`}>{category.Filter || category.Title}</Link>;
        })}
      </div>
    </nav>
  );
};

export default Filter;
