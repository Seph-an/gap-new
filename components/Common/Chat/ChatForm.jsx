"use client";
import useStore from "@lib/store";
import { ArrowLeft } from "lucide-react";
// import InquiryForm from "./InquiryForm";
import RenderInquiryForm from "./RenderInquiryForm";

const ChatForm = () => {
  const isVisibleChatForm = useStore((state) => state.isVisibleChatForm);

  const toggleVisibilityChatFirst = useStore(
    (state) => state.toggleVisibilityChatFirst
  );
  const toggleVisibilityChatForm = useStore(
    (state) => state.toggleVisibilityChatForm
  );

  const handleClick = () => {
    toggleVisibilityChatFirst();
    toggleVisibilityChatForm();
  };

  return (
    <>
      {isVisibleChatForm && (
        <div className="pb-5">
          <div className="bg-green-100 rounded-tr-[16px] rounded-tl-[16px] pt-12 pb-5 flex flex-col gap-3">
            <p className="text-secondary text-opacity-85 text-sm text-center mt-4">
              Feel free to drop us a message now!
            </p>
            <button
              onClick={handleClick}
              className="ml-3 w-fit bg-primary shadow-md rounded-[0.325rem] py-2 px-3 flex items-center gap-2"
            >
              <ArrowLeft color="#fff" size={16} strokeWidth={2} />
              <span className="text-tertiary  text-sm">Back</span>
            </button>
          </div>
          <RenderInquiryForm />
        </div>
      )}
    </>
  );
};

export default ChatForm;
