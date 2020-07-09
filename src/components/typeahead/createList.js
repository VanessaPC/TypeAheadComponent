import React, { useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";

export const ListItem = ({ item, focused, setSelectedItem }) => {
  // ** I keep a reference to the item here
  // ** so I have access to it to set the focus in the item
  // ** when the user navigates with the keyboard.
  const listItemRef = useRef();

  useLayoutEffect(() => {
    if (focused) {
      listItemRef.current.focus();
    }
  }, [focused]);

  const handleItemSelect = (e, selectedValue, setChar) => {
    if (e.key === "Enter") {
      setSelectedItem(selectedValue);
      setChar(selectedValue);
    }
  };

  return (
    <li
      key={`${item.length}${item}`}
      id={"list-item"}
      tabIndex="0"
      ref={listItemRef}
      onKeyPress={(e) => handleItemSelect(e, item)}
      onClick={() => setSelectedItem(item)}
    >
      <p>{item}</p>
    </li>
  );
};

ListItem.propTypes = {
  item: PropTypes.string,
  focused: PropTypes.bool,
  setSelectedItem: PropTypes.func,
};
