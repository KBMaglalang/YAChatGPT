"use client";

import React, { createContext, useContext, useState } from "react";

type promptSettingsType = {
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
};

type StateContextType = {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  promptInput: (newInput: string) => void;
  promptSettings: promptSettingsType;
  setPromptSettings: React.Dispatch<React.SetStateAction<promptSettingsType>>;
};

const defaultContextValue: StateContextType = {
  userInput: "",
  setUserInput: () => {},
  promptInput: () => {},

  promptSettings: {
    temperature: 0.8,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    maxTokens: 1000,
  },
  setPromptSettings: () => {},
};

type StateProviderProps = {
  children: React.ReactNode;
};

// Create a new context
const StateContext = createContext(defaultContextValue);

// Create a state provider component
export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  // Define a state variable using useState hook
  const [userInput, setUserInput] = useState<string>("");
  const [promptSettings, setPromptSettings] = useState({
    temperature: 0.8,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    maxTokens: 1000,
  });

  /**
   * Updates the prompt input with the new input value.
   *
   * @param {string} newInput - The new input value.
   * @returns {void}
   */
  const promptInput = (newInput: string) => {
    // check if the new Input contains {{text}} in the string
    if (newInput.includes("{{text}}")) {
      // replace {{text}} with the userInput
      newInput = newInput.replace("{{text}}", userInput);
    } else {
      // if not, just concatenate the newInput to the existing userInput
      newInput = userInput + newInput;
    }

    // update the userInput with the value passed in to this function by concatenating the newInput to the existing userInput
    setUserInput(newInput);
  };

  // Pass the state and update functions to the context provider
  return (
    <StateContext.Provider
      value={{
        userInput,
        setUserInput,
        promptInput,
        promptSettings,
        setPromptSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

/**
 * Retrieves the state context from the nearest `StateProvider`.
 *
 * @returns {StateContext} - The state context.
 * @throws {Error} - If `useStateContext` is used outside of a `StateProvider`.
 */
export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
