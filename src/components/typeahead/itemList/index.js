import React, { useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { BoldPart, Item } from "./styles";
import { getBoldChars, getRightChars } from "./helpers";

export const ListItem = ({
  item,
  focused,
  selectedChars,
  index,
  onItemSelect,
}) => {
  // ** I keep a reference to the item here
  // ** so I have access to it to set the focus in the item
  // ** when the user navigates with the keyboard.
  const listItemRef = useRef();

  useLayoutEffect(() => {
    if (focused) {
      listItemRef.current.focus();
    }
  }, [focused]);

  const handleItemSelection = (e, item) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      onItemSelect(item);
    }
  };

  return (
    <Item
      tabIndex="0"
      ref={listItemRef}
      onKeyDown={(e) => handleItemSelection(e, item)}
      onClick={() => onItemSelect(item)}
      key={index}
      data-cy="search-result-item"
      index={index}
    >
      <BoldPart
        dangerouslySetInnerHTML={{ __html: getBoldChars(item, selectedChars) }}
      />
      <span
        dangerouslySetInnerHTML={{ __html: getRightChars(item, selectedChars) }}
      />
    </Item>
  );
};

ListItem.propTypes = {
  item: PropTypes.string,
  focused: PropTypes.bool,
  onItemSelect: PropTypes.func,
  closeList: PropTypes.func,
  selectedChars: PropTypes.string,
  index: PropTypes.number,
};
