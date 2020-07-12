export const filterList = (filterTerm, list) =>
  list.filter((word) => {
    if (word.startsWith(filterTerm)) {
      return true;
    } else {
      return false;
    }
  });

export const setFocus = (value) => value.current.focus();

export const inputIsFilled = (value) => value.length !== 0;
