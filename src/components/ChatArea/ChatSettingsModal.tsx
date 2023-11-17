import React from "react";

// components
import ModelSelection from "./ModelSelection";
import { Slider } from "../Common";

// context or store
import { useStateContext } from "@/context/stateContext";

// constants or functions

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
        className="fixed inset-0 w-full h-full  opacity-40"
        onClick={(e) => setModalOpen(false)}
      ></div>

      {/* modal box */}
      <div className="flex items-center px-4 py-8 min-h-screen">
        <div className="relative py-4 mx-auto w-full max-w-lg rounded-md shadow-2xl bg-base-200 shadow-gray-700">
          {/* settings input or logout */}
          <div className="mt-3 px-4">
            <div className="flex flex-col mt-2 text-center">
              <h4 className="mb-2 text-xl font-bold text-base-content font-brand-roboto">
                Chat Settings
              </h4>
            </div>

            {/* settings */}
            <div className="flex flex-wrap justify-around items-center space-y-4 w-full bg-transparent lg:flex-col text-base-content">
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
              <div className="form-control w-full ">
                <label className="label w-full">
                  <span className="label-text">Max Tokens</span>
                </label>

                <input
                  type="number"
                  value={promptSettings.maxTokens}
                  className="input input-bordered  bg-transparent"
                  onChange={(e) =>
                    handleSettingChange("maxTokens", parseInt(e.target.value))
                  }
                />
              </div>

              {/* <div className="flex flex-row justify-between items-center space-x-2 w-full">
                <span className="mb-2 messageSettings font-brand-roboto">
                  Max Tokens
                </span>

                <input
                  type="number"
                  value={promptSettings.maxTokens}
                  className="input input-bordered  bg-transparent"
                  onChange={(e) =>
                    handleSettingChange("maxTokens", parseInt(e.target.value))
                  }
                />
              </div> */}
            </div>

            {/* model selection */}
            <ModelSelection />
          </div>

          {/* user selection */}
          <div className="gap-2 items-center mt-3 w-full px-4 flex flex-col">
            {/* <button
              className="btn btn-outline flex-1 text-base-content font-brand-roboto"
              onClick={handleAccept}
            >
              Accept
            </button> */}
            <button
              className="btn btn-outline w-full text-base-content font-brand-roboto"
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
