import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { ListItem } from "./itemList";
import { filterList, inputIsFilled, setFocus } from "./helpers";
import { USER_INPUT } from "./constants";
import { MdClose } from "react-icons/md";
import {
  Container,
  Input,
  Button,
  ListContainer,
  InputContainer,
} from "./styles";
import { WHITE } from "../../styles/colors";

export const TypeAhead = ({ list }) => {
  const [filterColor, setFilterColor] = useState("");
  const [char, setChar] = useState("");
  const [displayList, setDisplayList] = useState(null);
  const [listOpen, setListOpen] = useState(displayList !== null);
  const [focusIndex, setFocusIndex] = useState(null);

  // ** I want to control the navigation of the user towards the input field
  // ** so same as with the List items, I keep a check to the input field ref here.
  const inputRef = useRef();
  const clearButtonRef = useRef();
  const containerRef = useRef();

  const handleInstantChange = (e) => {
    e.stopPropagation();
    const userInput = e.target.value;

    setFilterColor(userInput);
    setListOpen(userInput.length > 0);
  };

  const createResultsList = useCallback(
    (value) => {
      setDisplayList(filterList(value, list));
      setFocusIndex(null);
    },
    [list]
  );

  const stringCheck = useCallback(
    (searchTerm) => {
      const regex = /[a-zA-Z]+/g;
      const value = searchTerm.trimStart();

      if (searchTerm.match(regex)) {
        setChar(value);
        createResultsList(value);
      } else {
        setDisplayList(null);
      }

      if (!searchTerm.length) {
        setChar("");
      }
    },
    [createResultsList]
  );

  useEffect(() => {
    const timer = setTimeout(() => stringCheck(filterColor), 200);

    return () => clearTimeout(timer);
  }, [filterColor, stringCheck, setChar]);

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

  const getKeyAction = (e) => {
    if (!inputIsFilled(char)) return;

    if (
      (e.shiftKey && e.key === USER_INPUT.TAB) ||
      e.key === USER_INPUT.ARROW_UP
    ) {
      e.preventDefault();
      moveUp();
      return;
    }

    switch (e.key) {
      case USER_INPUT.TAB:
        e.preventDefault();
        moveDown();
        break;

      case USER_INPUT.ARROW_DOWN:
        e.preventDefault();
        moveDown();
        break;

      case USER_INPUT.ARROW_RIGHT:
        e.preventDefault();
        setFocus(clearButtonRef);
        break;

      case USER_INPUT.ARROW_LEFT:
        e.preventDefault();
        setFocus(inputRef);
        break;

      case USER_INPUT.ESCAPE:
        setListOpen(false);
        break;

      case USER_INPUT.ENTER:
        clearList();
        break;

      default:
        return null;
    }
  };

  const clearList = () => {
    setChar("");
    setFilterColor("");
    setFocusIndex(null);
    setDisplayList(null);
  };

  const onItemSelect = (value) => {
    setFocus(inputRef);
    setFilterColor(value);
    setListOpen(false);
  };

  // In this case we set a timeout because the element body gets focused before the element
  // and we only want to check after the actual focused element is active.
  // This check happens because we care about other elements state of focus and unfocused.
  const handleBlur = (e) => {
    setTimeout(() => {
      if (!containerRef.current.contains(document.activeElement)) {
        setListOpen(false);
      }
    });
  };

  return (
    <Container
      data-cy="search-container"
      onKeyDown={(e) => getKeyAction(e)}
      ref={containerRef}
      onBlur={handleBlur}
    >
      <InputContainer>
        <Input
          data-cy="search-input"
          id="input-filter"
          type="text"
          name="filter"
          placeholder="Start your search"
          onChange={(e) => handleInstantChange(e)}
          value={filterColor}
          ref={inputRef}
          autoComplete="off"
          onClick={() => {
            char && char.length && createResultsList(char);
            setListOpen(displayList !== null);
          }}
        />
        {inputIsFilled(char) && (
          <Button
            onClick={clearList}
            onKeyDown={(e) => getKeyAction(e)}
            ref={clearButtonRef}
          >
            <MdClose fontSize="1.4rem" fill={WHITE} />
          </Button>
        )}
      </InputContainer>
      {listOpen && (
        <ListContainer>
          {displayList &&
            displayList.map((item, index) => (
              <ListItem
                data-cy="search-results"
                index={index}
                item={item}
                key={item}
                focused={index === focusIndex}
                onItemSelect={onItemSelect}
                selectedChars={char}
              />
            ))}
        </ListContainer>
      )}
    </Container>
  );
};

TypeAhead.propTypes = {
  list: PropTypes.array,
};
