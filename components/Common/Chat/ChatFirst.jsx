import Link from "next/link";

const ChatFirst = ({ chat }) => {
  return <div className="flex flex-col pb-8"><div className="bg-[#1e1e1e] rounded-tr-[16px] rounded-tl-[16px] pt-12 pb-5"><p className="text-white max-w-[250px] text-base mx-auto text-center mt-4">{chat.greeting}</p></div><div className="flex flex-col items-center font-medium gap-2 pt-8">{chat.options?.map((option, index) => <div key={`${option.label}-${option.url}`} className="w-full flex flex-col items-center gap-2"><Link href={option.url} className="w-4/5 p-3 bg-[#51D4D6] text-[#0a0a0a] rounded-[0.325rem] text-center">{option.label}</Link></div>)}</div></div>;
};

export default ChatFirst;
