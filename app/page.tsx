import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 overflow-hidden text-white">
      <h1 className="mb-20 text-5xl font-bold">ChatGPT</h1>

      <div className="p-4 m-4 bg-[#434654] rounded-xl max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold ">Conversations</h2>
        <p>
          {`Just click on '+ New Chat' at the bottom of the page to chat with
          ChatGPT. You can play around with the settings to make the AI chat
          just the way you like, whether that's more random, more focused, or
          less repetitive.`}
        </p>
      </div>

      <div className="p-4 m-4 bg-[#434654] rounded-xl max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold ">Prompt Templates</h2>
        <p>
          {`Using templates with AI like ChatGPT makes chatting easier and the
          responses better. It's like giving the AI a helping hand to understand
          you better, so you get the info you need faster and can have a more
          meaningful chat.`}
        </p>
      </div>
    </div>
  );
}

export default HomePage;
