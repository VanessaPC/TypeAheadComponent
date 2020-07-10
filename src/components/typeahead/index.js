import React, { useState, useRef } from "react";
import { colorsList } from "../../mock/list";
import { ListItem } from "./itemList";
import { filterList, stringStartsWithSpace, inputIsFilled } from "./helpers";

// todo: add a background on hover // focus
// todo: clicking outside the list should close the list
// todo: on clicking or entering selection of item, we should clear the list
// todo: cleaning the input should clear the list

// BUGS:

// improvements:
// todo: code clean up
// todo: add arrow up, down, left, right?
// todo: maybe adding error boundary
// todo: try find better solution for UI on bold strings

export const TypeAhead = () => {
  const [filterColor, setFilterColor] = useState("");
  const [char, setChar] = useState("");
  const [displayList, setDisplayList] = useState(null);
  const [time, setTime] = useState(null);

  const [focusIndex, setFocusIndex] = useState(null);

  // ** I want to control the navigation of the user towards the input field
  // ** so same as with the List items, I keep a check to the input field ref here.
  const inputRef = useRef();

  const handleInstantChange = (e) => {
    e.stopPropagation();
    let searchValue = e.target.value;

    setFilterColor(searchValue);
    stringCheck(searchValue);
  };

  const createResultsList = (value) => {
    if (time) clearTimeout(time);
    setTime(
      setTimeout(() => {
        setDisplayList(filterList(value, colorsList));
      }, 200)
    );
    setFocusIndex(null);
  };

  const stringCheck = (searchTerm) => {
    // ** It's a small regex to check for any A to Z value in a given string.
    const regex = /[a-zA-Z]+/g;

    if (stringStartsWithSpace(searchTerm) && searchTerm.match(regex)) {
      const value = searchTerm.trimStart();
      setChar(value);
      createResultsList(value);
    } else if (!stringStartsWithSpace(searchTerm) && searchTerm.match(regex)) {
      setChar(searchTerm);
      createResultsList(searchTerm);
    } else {
      setDisplayList(null);
    }
  };

  const moveDown = () =>
    focusIndex === null
      ? setFocusIndex(0)
      : setFocusIndex((focusIndex + 1) % displayList.length);

  const moveUp = () => {
    switch (focusIndex) {
      case null:
        setFocusIndex(displayList.length - 1);
        break;

      case 0:
        setFocusIndex(null);
        inputRef.current.focus();
        break;

      default:
        setFocusIndex(
          (focusIndex - 1 + displayList.length) % displayList.length
        );
        break;
    }
  };

  // I want to clear the list
  // clear the input field
  const clearList = () => {
    setChar(""); // this clears the input
    setFilterColor(""); // this clears the filter
    setFocusIndex(null);
    setDisplayList(null);
  };

  const getKey = (e) => {
    if (!inputIsFilled(char)) return;

    if (e.shiftKey && e.key === "Tab") {
      e.preventDefault();
      moveUp();
    } else if (e.key === "Tab") {
      e.preventDefault();
      moveDown();
    } else if (e.key === "Escape") {
      clearList();
    }
  };

  return (
    <>
      <p>Search Colors</p>
      <div onKeyDown={(e) => getKey(e)}>
        <input
          id="input-filter"
          type="text"
          name="filter"
          placeholder="what color are you looking for?"
          onChange={(e) => handleInstantChange(e)}
          value={filterColor}
          ref={inputRef}
        />
        <button onClick={clearList}>Clear list</button>
        <ul>
          {inputIsFilled(char) &&
            displayList &&
            displayList.map((item, index) => (
              <ListItem
                item={item}
                focused={index === focusIndex}
                setSelectedItem={setFilterColor}
                createResultsList={createResultsList}
                selectedChars={char}
              />
            ))}
        </ul>
      </div>
    </>
  );
};
