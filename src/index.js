import React from "react";
import ReactDOM from "react-dom";
import { BaseCSS } from "./styles/base";
import { TypeAhead } from "./components/typeahead";
import { colorsList } from "./mock/list";

ReactDOM.render(
  <>
    <BaseCSS />
    <TypeAhead list={colorsList} />
  </>,
  document.getElementById("root")
);
