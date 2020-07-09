import React, { useState } from "react";
import { colorsList } from "../../mock/list";

// ** The list should be case sensitive
// ** it should return only those values that start with the characters they entered
// ** empty space is considered empty (I should remove it )
// todo: use props
// todo: style on bold the matching characters
// todo: display the items as a list that is interactive and they get a background when you hover
// todo: input and list should be keyboard navigable
// todo: clicking outside the list should close the list

const filterList = (filterTerm, list) => {
  // if filter term has space we wat to trim it
  return list.filter((word) => {
    if (word.startsWith(filterTerm)) {
      return true;
    } else {
      return false;
    }
  });
};

export const TypeAhead = () => {
  const [filterColor, setFilterColor] = useState("");
  const [char, setChar] = useState("");
  const [displayList, setDisplayList] = useState(colorsList);
  const [t, setT] = useState(null);

  const handleInstantChange = (e) => {
    e.stopPropagation();
    let searchValue = e.target.value;

    setFilterColor(searchValue);
    isEmpty(searchValue);
  };

  const isEmpty = (searchTerm) => {
    const regex = /[a-z]|[A-Z]/g;

    // is empty is the string is empty of it has spaces
    if (filterColor.startsWith(" ") && filterColor.match(regex)) {
      const value = searchTerm.trimStart();
      setChar(searchTerm.trimStart());
      if (t) clearTimeout(t);
      setT(
        setTimeout(() => {
          setDisplayList(filterList(value, colorsList));
        }, 500)
      );
      // doesn't start with space
    } else if (!filterColor.startsWith(" ") && filterColor.match(regex)) {
      if (t) clearTimeout(t);
      setChar(searchTerm);
      setT(
        setTimeout(() => {
          setDisplayList(filterList(searchTerm, colorsList));
        }, 500)
      );
    }
  };

  return (
    <>
      <p>Search Colors</p>
      <input
        id="color-filter"
        type="text"
        name="filter"
        placeholder="what color are you looking for?"
        onChange={(e) => handleInstantChange(e)}
        value={filterColor}
      />
      {char.length !== 0 &&
        displayList &&
        displayList.map((item) => <p key={`as${item}`}>{item}</p>)}
    </>
  );
};
