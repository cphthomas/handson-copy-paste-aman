import React from "react";
import { addClassWhenNeeded, RendererProps } from "../utils";

export function StarsRenderer(props) {
  addClassWhenNeeded(props);

  return <div className="star htCenter">{"★".repeat(props.value)}</div>;
}
