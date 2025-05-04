"use client";

import Close from "./Close";
import ChatFirst from "./ChatFirst";
import useStore from "@/lib/store";

const ChatOptions = () => {
  const isVisibleChatOptions = useStore((state) => state.isVisibleChatOptions);

  return (
    <>
      {isVisibleChatOptions && (
        <div
          style={{
            boxShadow:
              "0 4px 6px -1px rgba(81, 212, 214, 0.5), 0 2px 4px -2px rgba(81, 212, 214, 0.3)",
          }}
          className="z-[30] rounded-[16px] shadow-md bg-gray-900 fixed right-3 top-25 min-w-[320px]"
        >
          <div className="rounded-inherit relative h-full w-full">
            <div className="rounded-full w-3 h-3 bg-green-500 absolute left-5 top-8"></div>
            <Close />
            <ChatFirst />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatOptions;
