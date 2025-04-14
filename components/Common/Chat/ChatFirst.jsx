"use client";

import Link from "next/link";
import useStore from "@lib/store";

const ChatFirst = () => {
  const toggleVisibilityChatFirst = useStore(
    (state) => state.toggleVisibilityChatFirst
  );
  const toggleVisibilityChatForm = useStore(
    (state) => state.toggleVisibilityChatForm
  );
  const isVisibleChatFirst = useStore((state) => state.isVisibleChatFirst);

  const handleClick = () => {
    toggleVisibilityChatFirst();
    toggleVisibilityChatForm();
  };

  return (
    <>
      {isVisibleChatFirst && (
        <div className="flex flex-col pb-5">
          <div className="rounded-tr-[16px] rounded-tl-[16px] pt-12 pb-5">
            <p className="text-secondary text-opacity-90 text-sm text-center mt-4">
              Hello, we are <span className="text-primary">live</span> and eager
              to assit you 😃
            </p>
          </div>
          <div className="flex flex-col items-center text-white font-medium gap-2 pt-5">
            <Link
              href="#"
              className="w-4/5 p-3 bg-primary rounded-[0.325rem] text-center"
            >
              Let's chat on Whatsapp!
            </Link>
            <p className="text-cool-blue">or</p>
            <div
              onClick={handleClick}
              className="w-4/5 p-3 bg-primary rounded-[0.325rem] text-center"
            >
              Leave us a message!
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatFirst;
