import Handsontable from "handsontable";

// export type RendererProps = {
//   TD: HTMLTableCellElement;
//   value: any;
//   cellProperties: Handsontable.CellProperties;
// };

export const addClassWhenNeeded = (props) => {
  const className = props.cellProperties.className;

  if (className !== void 0) {
    Handsontable.dom.addClass(props.TD, className);
  }
};
