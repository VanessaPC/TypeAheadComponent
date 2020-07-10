export const filterList = (filterTerm, list) =>
  list.filter((word) => {
    if (word.startsWith(filterTerm)) {
      return true;
    } else {
      return false;
    }
  });

export const stringStartsWithSpace = (value) => value.startsWith(" ");

export const inputIsFilled = (value) => value.length !== 0;
