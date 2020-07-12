export const filterList = (filterTerm, list) =>
  list.filter((word) => word.match(new RegExp(`^${filterTerm}`, "i")));

export const setFocus = (value) => value.current.focus();
export const inputIsFilled = (value) => value.length !== 0;
