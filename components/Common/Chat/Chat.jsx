"use client";
import { useEffect, useState } from "react";
import { MessagesSquare } from "lucide-react";
import useStore from "@/lib/store";

const Chat = ({ global }) => {
  const toggleVisibilityChatOptions = useStore((state) => state.toggleVisibilityChatOptions);
  const toggleVisibilityChat = useStore((state) => state.toggleVisibilityChat);
  const isVisibleChat = useStore((state) => state.isVisibleChat);
  const [bottom, setBottom] = useState("bottom-[0.325rem]");
  const launcher = global?.chat?.launcher;

  useEffect(() => {
    const handleScroll = () => setBottom(window.scrollY > 300 ? "bottom-[4.5rem]" : "bottom-[0.325rem]");
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    toggleVisibilityChatOptions();
    toggleVisibilityChat();
  };

  return <div className={`cursor-pointer z-[50] fixed ${bottom} w-fit right-2 gap-2 flex flex-col items-center`}>{isVisibleChat && launcher && <><div onClick={handleClick} className="p-2 md:p-3 bg-[#51d4d6] rounded-full shadow-lg"><MessagesSquare color="#0a0a0a" size={36} strokeWidth={1} /></div><span className="text-[#51D4D6] text-xs sm:text-sm text-center whitespace-pre-line">{launcher}</span></>}</div>;
};

export default Chat;
