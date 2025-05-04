"use client";
import useStore from "@/lib/store";
import { X } from "lucide-react";

const Close = () => {
  const toggleVisibilityChatOptions = useStore(
    (state) => state.toggleVisibilityChatOptions
  );
  const toggleVisibilityChat = useStore((state) => state.toggleVisibilityChat);

  const handleClick = () => {
    toggleVisibilityChatOptions();
    toggleVisibilityChat();
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer p-2 bg-white flex items-center justify-center rounded-full shadow-lg absolute right-2 top-2"
    >
      <X color="#ef4444" size={28} strokeWidth={2} />
    </div>
  );
};

export default Close;
