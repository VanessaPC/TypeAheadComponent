import React, { useState } from "react";
import { colorsList } from "../../mock/list";

// ** The list should be case sensitive
// ** it should return only those values that start with the characters they entered
// ** empty space is considered empty (I should remove it )
// todo: clicking on a list item it should populate the input
// todo: use props
// todo: style on bold the matching characters
// todo: display the items as a list that is interactive and they get a background when you hover
// todo: input and list should be keyboard navigable
// todo: clicking outside the list should close the list

const filterList = (filterTerm, list) =>
  list.filter((word) => {
    if (word.startsWith(filterTerm)) {
      return true;
    } else {
      return false;
    }
  });

const stringStartsWithSpace = (value) => value.startsWith(" ");

const CreateList = ({ item }) => (
  <li key={`as${item}`}>
    <p>{item}</p>
  </li>
);

export const TypeAhead = () => {
  const [filterColor, setFilterColor] = useState("");
  const [char, setChar] = useState("");
  const [displayList, setDisplayList] = useState(colorsList);
  const [time, setTime] = useState(null);

  const handleInstantChange = (e) => {
    e.stopPropagation();
    let searchValue = e.target.value;

    setFilterColor(searchValue);
    isEmpty(searchValue);
  };

  const createResultsList = (value) => {
    if (time) clearTimeout(time);
    setTime(
      setTimeout(() => {
        setDisplayList(filterList(value, colorsList));
      }, 200)
    );
  };

  const isEmpty = (searchTerm) => {
    const regex = /[a-zA-Z]+/g;

    if (stringStartsWithSpace(searchTerm) && searchTerm.match(regex)) {
      const value = searchTerm.trimStart();
      setChar(value);
      createResultsList(value);
    } else if (!stringStartsWithSpace(searchTerm)) {
      setChar(searchTerm);
      createResultsList(searchTerm);
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
      <ul>
        {char.length !== 0 &&
          displayList &&
          displayList.map((item) => <CreateList item={item} />)}
      </ul>
    </>
  );
};
