import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.css";
import { data, data2 } from "./constants";
import "handsontable/dist/handsontable.min.css";
import "handsontable/languages/de-DE";

const hotSettings = {
  data: data2,
  colHeaders: true,
  height: "auto",
  licenseKey: "non-commercial-and-evaluation",
  // language: "de-DE", => For language
  contextMenu: true,
  //colHeaders: ['ID', 'Full name', 'Position','Country', 'City'], => For columns custom labels
  //contextMenu: ["copy", "cut", "paste"], => For copy/paste
  //maxCols: 2, => For max limit of columns
  //minCols: 1 => For min limit of columns
  hiddenColumns: true,
};

function App() {
  const hotTableComponent = useRef(null);
  const [sum, setSum] = useState(0);

  useEffect(() => {}, [hotTableComponent]);

  // const isNumber = (n) => {
  //   return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  // };

  const afterUpdateCell = (changes, source) => {
    if (changes) {
      // console.log("changes", changes);
      changes.forEach(([row, col, oldValue, newValue]) => {
        const allValuesOfCol =
          hotTableComponent.current.hotInstance.getDataAtCol(col);
        let totalSum = 0;
        for (const cell of allValuesOfCol) {
          const convertedCell = cell.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          });
          // console.log("convertedCell", convertedCell);
          // const testCellParse = parseFloat(testCell);
          // console.log("testCellParse", testCellParse);
          // if (isNumber(cell)) {
          //   totalSum += parseFloat(cell);
          // }
          totalSum += parseFloat(convertedCell.replace(",", ".").replace(" ", ""));
        }
        if (isNaN(totalSum)) {
          alert("Non numeric values are pasted in column");
        } else {
          setSum(totalSum);
        }
      });
    }
  };

  return (
    <div className="controls">
      <HotTable
        ref={hotTableComponent}
        settings={hotSettings}
        afterChange={afterUpdateCell}
      />
      Sum
      <br></br>
      {sum}
      <br></br>
    </div>
  );
}

export default App;
