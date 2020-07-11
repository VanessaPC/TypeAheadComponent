import React, { useState, useRef } from "react";
import { colorsList } from "../../mock/list";
import { ListItem } from "./itemList";
import { filterList, stringStartsWithSpace, inputIsFilled } from "./helpers";
import { Container, Input, Button, ListContainer } from "./styles";

// todo: clicking outside the list should close the list
// todo: on clicking or entering selection of item, we should clear the list
// todo: cleaning the input should clear the list

// todo: add styles
// todo: add responsive design
// todo: add animations
// todo: add meaningful comments

// improvements:
// todo: code clean up
// **: add arrow up, down, left, right?
// **: add tests

export const TypeAhead = () => {
  const [filterColor, setFilterColor] = useState("");
  const [char, setChar] = useState("");
  const [displayList, setDisplayList] = useState(null);
  const [time, setTime] = useState(null);

  const [focusIndex, setFocusIndex] = useState(null);

  // ** I want to control the navigation of the user towards the input field
  // ** so same as with the List items, I keep a check to the input field ref here.
  const inputRef = useRef();
  const clearButtonRef = useRef();

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

  const moveRight = () => clearButtonRef.current.focus();

  const moveLeft = () => inputRef.current.focus();

  const clearList = () => {
    setChar("");
    setFilterColor("");
    setFocusIndex(null);
    setDisplayList(null);
  };

  const getKey = (e) => {
    if (!inputIsFilled(char)) return;

    if ((e.shiftKey && e.key === "Tab") || e.key === "ArrowUp") {
      e.preventDefault();
      moveUp();
    } else if (e.key === "Tab" || e.key === "ArrowDown") {
      e.preventDefault();
      moveDown();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      moveRight();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      moveLeft();
    } else if (e.key === "Escape") {
      clearList();
    }
  };

  const onClearListKeyDown = (e) => {
    if (e.key === "Enter") {
      clearList();
    }
  };

  return (
    <Container data-cy="search-container">
      <div onKeyDown={(e) => getKey(e)}>
        <Input
          data-cy="search-input"
          id="input-filter"
          type="text"
          name="filter"
          placeholder="what color are you looking for?"
          onChange={(e) => handleInstantChange(e)}
          value={filterColor}
          ref={inputRef}
          autoComplete="off"
        />
        <Button
          onClick={clearList}
          onKeyDown={onClearListKeyDown}
          ref={clearButtonRef}
        >
          Clear list
        </Button>
        <ListContainer>
          {inputIsFilled(char) &&
            displayList &&
            displayList.map((item, index) => (
              <ListItem
                data-cy="search-results"
                index={index}
                item={item}
                focused={index === focusIndex}
                setSelectedItem={setFilterColor}
                createResultsList={createResultsList}
                selectedChars={char}
              />
            ))}
        </ListContainer>
      </div>
    </Container>
  );
};
