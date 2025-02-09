import React from "react";

function Currency() {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Currency Futures</th>
          <th>Currency Options</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Brokerage</td>
          <td>0.03% or ₹20/executed order whichever is lower</td>
          <td>₹20/executed order</td>
        </tr>
        <tr>
          <td>STT/CTT</td>
          <td>No STT</td>
          <td>No STT</td>
        </tr>
        <tr>
          <td>Transaction charges </td>
          <td>NSE: 0.00035% BSE: 0.00045% </td>
          <td>NSE: 0.0311% BSE: 0.001%</td>
        </tr>
        <tr>
          <td>GST</td>
          <td>18% on (brokerage + SEBI charges + transaction charges) </td>
          <td>18% on (brokerage + SEBI charges + transaction charges)</td>
        </tr>
        <tr>
          <td>SEBI charges </td>
          <td>₹10 / crore </td>
          <td>₹10 / crore </td>
        </tr>
        <tr>
          <td>Stamp charges </td>
          <td>0.0001% or ₹10 / crore on buy side </td>
          <td>0.0001% or ₹10 / crore on buy side </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Currency;
