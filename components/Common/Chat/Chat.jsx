"use client";
import { useState, useEffect } from "react";
import { MessagesSquare } from "lucide-react";
import useStore from "@lib/store";

const Chat = () => {
  const toggleVisibilityChatOptions = useStore(
    (state) => state.toggleVisibilityChatOptions
  );
  const toggleVisibilityChat = useStore((state) => state.toggleVisibilityChat);
  const isVisibleChat = useStore((state) => state.isVisibleChat);

  const [bottom, setBottom] = useState("bottom-[0.325rem]");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setBottom("bottom-[4.5rem]");
      } else {
        setBottom("bottom-[0.325rem]");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    toggleVisibilityChatOptions();
    toggleVisibilityChat();
  };

  return (
    <div
      className={`z-[50] fixed text-primary ${bottom} w-fit right-2 gap-2 flex flex-col items-center`}
    >
      {isVisibleChat && (
        <>
          <div
            onClick={handleClick}
            className="p-2 bg-tertiary rounded-full shadow-lg"
          >
            <MessagesSquare color="#16a34a" size={36} strokeWidth={1} />
          </div>

          <span className="text-xs sm:text-sm text-center">
            Hey 🖐,
            <br /> Let's chat!
          </span>
        </>
      )}
    </div>
  );
};

export default Chat;
