"use client";

import Close from "./Close";
import ChatFirst from "./ChatFirst";
import ChatForm from "./ChatForm";
import useStore from "@lib/store";

const ChatOptions = () => {
  const isVisibleChatOptions = useStore((state) => state.isVisibleChatOptions);

  return (
    <>
      {isVisibleChatOptions && (
        <div className="z-[30] rounded-[16px] shadow-md bg-tertiary fixed right-2 top-20 min-w-[320px]">
          <div className="rounded-inherit relative h-full w-full">
            <div className="rounded-full w-3 h-3 bg-green-400 absolute left-5 top-8"></div>
            <Close />
            <ChatFirst />
            <ChatForm />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatOptions;
