import React from "react";

// components

// context or store

// constants or functions

interface SliderProps {
  title: string;
  min: number;
  max: number;
  value: number;
  callback: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  title,
  min,
  max,
  value,
  callback,
}) => {
  /**
   * The function "handleSliderChange" is a callback function that takes in an event of type
   * React.ChangeEvent<HTMLInputElement> and calls a callback function with the parsed float value of
   * the input element's value.
   * @param e - The parameter `e` is of type `React.ChangeEvent<HTMLInputElement>`. This means it is an
   * event object that is triggered when the value of an input element of type `HTMLInputElement`
   * changes.
   */
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    callback(parseFloat(e.target.value));
  };

  /**
   * Handles the change event of an input element.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
   * @returns {void}
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      callback(newValue);
    }
  };

  return (
    <div className="form-control w-full ">
      <label className="label w-full">
        <span className="label-text">{title}</span>
      </label>

      <div className="flex flex-row w-full items-center justify-center space-x-2">
        <input
          type="range"
          min={min}
          max={max}
          step={0.1}
          value={value}
          onChange={handleSliderChange}
          className="range w-full"
        />
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          step={0.1}
          min={min}
          max={max}
          className="input input-bordered  bg-transparent"
        />
      </div>
    </div>
  );
};
