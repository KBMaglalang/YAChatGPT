import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DocumentData } from "firebase/firestore";
import { UserCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isAssistant = message.user._id === "assistant";

  return (
    <div className={`py-5 text-white ${isAssistant && "bg-[#434654]"}`}>
      <div className="flex px-10 mx-auto space-x-5">
        {/* user and chatgpt icons */}
        {isAssistant ? (
          <img src={message.user.avatar} alt="avatar" className="w-8 h-8" />
        ) : (
          <UserCircleIcon className="w-8 h-8 text-gray-300 " />
        )}

        {/* message container */}
        <div className="flex flex-col w-full">
          {/* chatgpt settings for the response */}
          {isAssistant && (
            <div className="flex flex-col">
              <div className="flex flex-wrap justify-between py-2">
                <span className="messageSettings">{`${message.model}`}</span>
                <span className="messageSettings ">{`Temperature: ${message.temperature}`}</span>
                <span className="messageSettings ">{`Top P: ${message.topP}`}</span>
                <span className="messageSettings ">{`Frequency Penalty: ${message.frequencyPenalty}`}</span>
                <span className="messageSettings ">{`Presence Penalty: ${message.presencePenalty}`}</span>
              </div>

              <div className="flex flex-wrap justify-between py-2">
                <span className="messageSettings ">{`Prompt Tokens: ${message.promptTokens}`}</span>
                <span className="messageSettings ">{`Completion Tokens: ${message.completionTokens}`}</span>
                <span className="messageSettings ">{`Total Tokens: ${message.totalTokens}`}</span>
                <span className="messageSettings ">{`User Set Max Tokens: ${message.maxTokens}`}</span>
                <span className="messageSettings ">
                  {`${message.createdAt.toDate().toLocaleString()}`}
                </span>
              </div>
            </div>
          )}

          {/* message markdown */}
          <div className="flex flex-col flex-wrap items-center">
            <ReactMarkdown
              className="w-full max-w-4xl pt-2 prose text-white break-words flex-shrink-1"
              remarkPlugins={[remarkGfm]}
            >
              {message.text}
            </ReactMarkdown>
          </div>

          {/* chatgpt end message */}
          {isAssistant && (
            <div className="flex justify-between py-2">
              <span className="ml-auto messageSettings">{`Finish Reason: ${message.finish}`}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
