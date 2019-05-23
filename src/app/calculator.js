/**
 * @file calculator.js
 */
import React from "react";

const Calculator = () => (
  <div>
    <div>
      Enter grain weight
      <br />
      <input type="text" name="grain_weight" /> kg
    </div>
    <div>
      Mashthikness
      <br />
      <input type="text" name="mash_thikness" /> eg 2.5, 2.7
    </div>
    <div>
      Falsbottom in liters
      <br />
      <input type="text" name="false_bottom" /> eg 2 liter
    </div>
  </div>
);

export default Calculator;
