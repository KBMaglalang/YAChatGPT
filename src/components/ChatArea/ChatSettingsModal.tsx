import React from 'react';

// components
import ModelSelection from './ModelSelection';
import { Slider } from '../Common';

// context or store
import { useStateContext } from '@/context/stateContext';

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

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {/* handles clicks outside the modal box */}
      <div
        className="fixed inset-0 h-full w-full  opacity-40"
        onClick={(e) => setModalOpen(false)}
      ></div>

      {/* modal box */}
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-lg rounded-md bg-base-200 py-4 shadow-2xl shadow-gray-700">
          {/* settings input or logout */}
          <div className="mt-3 px-4">
            <div className="mt-2 flex flex-col text-center">
              <h4 className="mb-2 font-brand-roboto text-xl font-bold text-base-content">
                Chat Settings
              </h4>
            </div>

            {/* settings */}
            <div className="flex w-full flex-wrap items-center justify-around space-y-4 bg-transparent text-base-content lg:flex-col">
              {/* temperature - slider and input */}
              <Slider
                title="Temperature"
                min={0}
                max={2}
                value={promptSettings.temperature}
                callback={(value) => handleSettingChange('temperature', value)}
              />

              {/* topP - slider and input */}
              <Slider
                title="Top P"
                min={0}
                max={1}
                value={promptSettings.topP}
                callback={(value) => handleSettingChange('topP', value)}
              />

              {/* frequencyPenalty - slider and input */}
              <Slider
                title="Frequency Penalty"
                min={-2}
                max={2}
                value={promptSettings.frequencyPenalty}
                callback={(value) => handleSettingChange('frequencyPenalty', value)}
              />

              {/* presencePenalty - slider and input */}
              <Slider
                title="Presence Penalty"
                min={-2}
                max={2}
                value={promptSettings.presencePenalty}
                callback={(value) => handleSettingChange('presencePenalty', value)}
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
                  onChange={(e) => handleSettingChange('maxTokens', parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* model selection */}
            <ModelSelection />
          </div>

          {/* user selection */}
          <div className="mt-3 flex w-full flex-col items-center gap-2 px-4">
            <button
              className="btn btn-outline w-full font-brand-roboto text-base-content"
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
