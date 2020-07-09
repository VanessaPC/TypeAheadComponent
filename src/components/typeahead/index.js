import React, { useState, useRef } from "react";
import { colorsList } from "../../mock/list";
import { ListItem } from "./createList";
import { filterList, stringStartsWithSpace } from "./helpers";

// ** The list should be case sensitive
// ** it should return only those values that start with the characters they entered
// ** empty space is considered empty (I should remove it)
// **: clicking on a list item it should populate the input
// todo: populating the input should re-triger a re render of the list

// ** use props
// todo: style on bold the matching characters
// todo: add a background on hover // focus
// todo: clicking outside the list should close the list

// **: input and list should be keyboard navigable
// **: read keypreses from user
// **: learn where the key is entering and set it as index
// **: read tab, tab moves forward or away from the input if no list items
// **: shift tab should move backwards or to the input
// **: focus away from the input when no list
// ** : focus back into the input when i reached the top

// BUGS:
// todo: initially when I enter a non-capital letter sometimes the list blinks
// todo: if I move away from list focusIndex should reset
// todo: keycode was deprecated and code doesn't work on IE11

const inputIsFilled = (value) => value.length !== 0;

export const TypeAhead = () => {
  const [filterColor, setFilterColor] = useState("");
  const [char, setChar] = useState("");
  const [displayList, setDisplayList] = useState(colorsList);
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
  };

  const stringCheck = (searchTerm) => {
    // ** It's a small regex to check for any A to Z value in a given string.
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

  const getKey = (e) => {
    if (e.keyCode === 9 && e.shiftKey) {
      if (!inputIsFilled(char)) return;
      e.preventDefault();
      moveUp();
    } else if (e.keyCode === 9) {
      if (!inputIsFilled(char)) return;
      e.preventDefault();
      moveDown();
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
        <ul>
          {inputIsFilled(char) &&
            displayList &&
            displayList.map((item, index) => (
              <ListItem
                item={item}
                focused={index === focusIndex}
                setSelectedItem={setFilterColor}
              />
            ))}
        </ul>
      </div>
    </>
  );
};
