import Link from "next/link";

const filterBtn =
  "rounded-[0.325rem] text-[#1e1e1e] text-sm px-3 py-1 transition-shadow duration-500 delay-150 ease-in-out hover:shadow-[0_0_10px_#51D4D6]";
const activeBtn = "bg-[#51D4D6]";
const inActiveBtn = "bg-white/90 shadow-sm";

const Filter = ({ filter = "all", categories = [] }) => {
  return (
    <div className="flex gap-2 mt-5 mb-12 flex-wrap">
      {categories.map((cat) => (
        <Link
          key={cat.Title}
          href={`/blog/category/${encodeURIComponent(cat.Title)}`}
          className={`${decodeURIComponent(filter).toLowerCase() === cat.Title.toLowerCase() ? activeBtn : inActiveBtn} ${filterBtn}`}
        >
          {cat.Filter || cat.Title}
        </Link>
      ))}
    </div>
  );
};

export default Filter;
