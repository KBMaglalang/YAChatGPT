import React from "react";

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
    <div className="flex flex-col items-center w-full">
      <span className="mb-2 messageSettings font-brand-roboto">{title}</span>

      <input
        type="range"
        min={min}
        max={max}
        step={0.1}
        value={value}
        onChange={handleSliderChange}
        className="w-full bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        step={0.1}
        min={min}
        max={max}
        className="w-full mt-2 text-center text-white rounded-md bg-[#212121]"
      />
    </div>
  );
};
