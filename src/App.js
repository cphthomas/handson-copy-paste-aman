import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.css";
import { data, data2 } from "./constants";
import "handsontable/dist/handsontable.min.css";

const hotSettings = {
  data: data2,
  colHeaders: true,
  height: "auto",
  licenseKey: "non-commercial-and-evaluation",
};

function App() {
  const hotTableComponent = useRef(null);
  const [sum, setSum] = useState(0);

  useEffect(() => {}, [hotTableComponent]);

  const isNumber = (n) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  };

  const afterUpdateCell = (changes, source) => {
    if (changes) {
      console.log("changes", changes);
      changes.forEach(([row, col, oldValue, newValue]) => {
        const allValuesOfCol =
          hotTableComponent.current.hotInstance.getDataAtCol(col);
        let totalSum = 0;
        for (const cell of allValuesOfCol) {
          if (isNumber(cell)) {
            totalSum += parseFloat(cell);
          }
        }
        setSum(totalSum);
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
