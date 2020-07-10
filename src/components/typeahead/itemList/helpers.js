export const getBoldChars = (item, selectedChars) =>
  item.substring(0, selectedChars.length);
export const getRightChars = (item, selectedChars) =>
  item.slice(selectedChars.length, item.length);
