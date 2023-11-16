import React, { useState } from "react";
import { useStateContext } from "@/context/stateContext";

import ModelSelection from "./ModelSelection";
import Slider from "./Slider";

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChatSettingsModal({ setModalOpen }: Props) {
  const { promptSettings, setPromptSettings } = useStateContext();

  // /**
  //  * Handles the change of a setting value.
  //  * Updates the prompt settings by merging the new value with the existing settings.
  //  *
  //  * @param {string} key - The key of the setting to be changed.
  //  * @param {number} newValue - The new value to be assigned to the setting.
  //  * @returns {void}
  //  */
  const handleSettingChange = (key: string, newValue: number) => {
    setPromptSettings((prev) => ({ ...prev, [key]: newValue }));
  };

  // const handleAccept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();

  //   setModalOpen(false);
  // };

  return (
    <div className="overflow-y-auto fixed inset-0 z-10">
      {/* handles clicks outside the modal box */}
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={(e) => setModalOpen(false)}
      ></div>

      {/* modal box */}
      <div className="flex items-center px-4 py-8 min-h-screen">
        <div className="relative p-4 mx-auto w-full max-w-lg rounded-md shadow-2xl bg-brand-additional-elements shadow-gray-700">
          {/* settings input or logout */}
          <div className="mt-3">
            <div className="flex flex-col mt-2 text-center">
              <h4 className="mb-2 text-xl font-bold text-white font-brand-roboto">
                Chat Settings
              </h4>
            </div>

            {/* settings */}
            <div className="flex flex-wrap justify-around items-center p-4 space-y-4 w-full bg-transparent lg:flex-col">
              {/* temperature - slider and input */}
              <Slider
                title="Temperature"
                min={0}
                max={2}
                value={promptSettings.temperature}
                callback={(value) => handleSettingChange("temperature", value)}
              />

              {/* topP - slider and input */}
              <Slider
                title="Top P"
                min={0}
                max={1}
                value={promptSettings.topP}
                callback={(value) => handleSettingChange("topP", value)}
              />

              {/* frequencyPenalty - slider and input */}
              <Slider
                title="Frequency Penalty"
                min={-2}
                max={2}
                value={promptSettings.frequencyPenalty}
                callback={(value) =>
                  handleSettingChange("frequencyPenalty", value)
                }
              />

              {/* presencePenalty - slider and input */}
              <Slider
                title="Presence Penalty"
                min={-2}
                max={2}
                value={promptSettings.presencePenalty}
                callback={(value) =>
                  handleSettingChange("presencePenalty", value)
                }
              />

              {/* max tokens - input */}
              <div className="flex flex-col items-center space-x-2 w-full">
                <span className="mb-2 messageSettings font-brand-roboto">
                  Max Tokens
                </span>
                <input
                  type="number"
                  value={promptSettings.maxTokens}
                  className="w-full mt-2 text-center rounded-md bg-[#212121] text-white font-brand-roboto"
                  onChange={(e) =>
                    handleSettingChange("maxTokens", parseInt(e.target.value))
                  }
                />
              </div>
            </div>

            {/* model selection */}
            <ModelSelection />
          </div>

          {/* user selection */}
          <div className="gap-2 items-center mt-3 sm:flex">
            {/* <button
              className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 hover:bg-gray-700"
              onClick={handleAccept}
            >
              Accept
            </button> */}
            <button
              className="font-brand-roboto w-full mt-2 p-2.5 flex-1 text-white rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 hover:bg-gray-700"
              onClick={(e) => setModalOpen(false)}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSettingsModal;
