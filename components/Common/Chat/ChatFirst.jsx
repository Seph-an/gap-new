import Link from "next/link";

const ChatFirst = () => {
  return (
    <div className="flex flex-col pb-8">
      <div className="bg-[#1e1e1e] rounded-tr-[16px] rounded-tl-[16px] pt-12 pb-5">
        <p className="text-white  max-w-[250px] text-base mx-auto text-center mt-4">
          Hello, we are <span className="text-[#51D4D6]">live</span> and eager
          to engage you 😃
        </p>
      </div>
      <div className=" flex flex-col items-center font-medium gap-2 pt-8">
        <Link
          href="https://wa.me/message/AV3EUFWJXRSJK1"
          className="w-4/5 p-3 bg-[#51D4D6] text-[#0a0a0a] rounded-[0.325rem] text-center"
        >
          Let's chat on Whatsapp!
        </Link>
        <p className="text-white/90">or</p>
        <Link
          href="/contact-us"
          className="w-4/5 p-3 bg-[#51D4D6] text-[#0a0a0a] rounded-[0.325rem] text-center"
        >
          Drop us a message!
        </Link>
      </div>
    </div>
  );
};

export default ChatFirst;
