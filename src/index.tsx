import React from "react";
import ReactDOM from "react-dom";
import withContainer from "$components/withContainer";
import "$assets/css/reset.css";
import "./index.scss";

import App from "$components/app";

const Container = withContainer(App);

ReactDOM.render(<Container/>, document.getElementById("root"));
