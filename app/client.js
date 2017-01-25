import React from "react";
import ReactDOM from "react-dom";
import DropzoneCom from "./components/Dropzone";

var dropzone = document.getElementById('dropzone');

ReactDOM.render(
    <div>
      <h1>Hello World</h1>
      <DropzoneCom />
    </div>,
    dropzone
);
