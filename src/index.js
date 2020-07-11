import React from "react";
import ReactDOM from "react-dom";
import { BaseCSS } from "./styles/base";
import { TypeAhead } from "./components/typeahead";

ReactDOM.render(
  <>
    <BaseCSS />
    <TypeAhead />
  </>,
  document.getElementById("root")
);
