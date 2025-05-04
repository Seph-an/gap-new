import Link from "next/link";

const filterBtn =
  "rounded-[0.325rem] text-[#1e1e1e] text-sm px-3 py-1 transition-shadow duration-500 delay-150 ease-in-out hover:shadow-[0_0_10px_#51D4D6]";
const activeBtn = "bg-[#51D4D6]";
const inActiveBtn = "bg-white/90 shadow-sm";
const Filter = ({ filter, categories }) => (
  <div className="flex gap-2 mt-5 mb-12 flex-wrap">
    <div className="flex items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#51D4D6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
      <span className="font-medium secondary">Filter:</span>
    </div>
    <Link
      href="/blog"
      className={`${filter === "all" ? activeBtn : inActiveBtn} ${filterBtn}`}
    >
      All
    </Link>
    {categories.map((cat) => (
      <Link
        key={cat.Title}
        href={`/blog/category/${encodeURIComponent(cat.Title)}`}
        className={` ${filter === cat.Title ? activeBtn : inActiveBtn} ${filterBtn}`}
      >
        {cat.Filter || cat.Title}
      </Link>
    ))}
  </div>
);

export default Filter;
