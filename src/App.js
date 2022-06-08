import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.css";
// import { data, data2 } from "./constants";
import "handsontable/dist/handsontable.min.css";
import "handsontable/languages/de-DE";
import { std, min, max, median, quantileSeq, sum } from 'mathjs';

const data2 = [
  [1, 2, 2],
  [2, 10, 11],
  [3, 20, 11],
  [4, 30, 15],
  [5, 33, 15],
  [6, 30, 15],
  [7, 30, 15],
  [8, 30, 15],
  [9, 30, 15],
  [10, 30, 15],
];

const hotSettings = {
  data: data2,
  colHeaders: true,
  rowHeaders: true,
  height: "auto",
  licenseKey: "non-commercial-and-evaluation",
  // language: "de-DE", => For language
  contextMenu: true,
  colHeaders: ['ID', 'Full name', 'Position','Country', 'City'], 
  // contextMenu: ["copy", "cut"],
  maxCols: 4, 
  //minCols: 1 => For min limit of columns
  hiddenColumns: true,
};



function App() {
  const hotTableComponent = useRef(null);
  const [Total, setTotal] = useState(0);
  const [colarray, setcolarray] = useState([1.4, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

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
          setTotal(totalSum);
          // setcolarray(allValuesOfCol);
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
      {Total}
      <br></br>
       <br></br>
                      Antal observationer length {colarray.length}
                      <br></br>
                      Mindste obs min {min(...colarray)}
                      <br></br>
                      Største obs max {max(...colarray)}
                      <br></br>
                      std from mathjs {std(...colarray)}
                      <br></br>
                      median from mathjs {median(...colarray)}
                      <br></br>
                      Quantile from mathjs {quantileSeq(colarray, 0.9)}
                      <br></br>
                      Sum from mathjs {sum(...colarray)}
                      <br></br>
    </div>
  );
}

export default App;
