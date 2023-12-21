/**
Truncates the given text if it exceeds the maximum length, and appends "..." at the end.
@param {string} text - The text to be truncated.
@returns {string} The truncated text.
*/

export const getDisplayText = (text: string) => {
  const maxLength = 30;
  return text?.length > maxLength ? text?.substring(0, maxLength - 3) + '...' : text;
};
