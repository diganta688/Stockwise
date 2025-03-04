import React from "react";

function Currency() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2"></th>
            <th className="border border-gray-300 px-4 py-2">Currency Futures</th>
            <th className="border border-gray-300 px-4 py-2">Currency Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Brokerage</td>
            <td className="border border-gray-300 px-4 py-2">
              0.03% or ₹20/executed order whichever is lower
            </td>
            <td className="border border-gray-300 px-4 py-2">₹20/executed order</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">STT/CTT</td>
            <td className="border border-gray-300 px-4 py-2">No STT</td>
            <td className="border border-gray-300 px-4 py-2">No STT</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Transaction charges</td>
            <td className="border border-gray-300 px-4 py-2">NSE: 0.00035% BSE: 0.00045%</td>
            <td className="border border-gray-300 px-4 py-2">NSE: 0.0311% BSE: 0.001%</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">GST</td>
            <td className="border border-gray-300 px-4 py-2">
              18% on (brokerage + SEBI charges + transaction charges)
            </td>
            <td className="border border-gray-300 px-4 py-2">
              18% on (brokerage + SEBI charges + transaction charges)
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">SEBI charges</td>
            <td className="border border-gray-300 px-4 py-2">₹10 / crore</td>
            <td className="border border-gray-300 px-4 py-2">₹10 / crore</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Stamp charges</td>
            <td className="border border-gray-300 px-4 py-2">0.0001% or ₹10 / crore on buy side</td>
            <td className="border border-gray-300 px-4 py-2">0.0001% or ₹10 / crore on buy side</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Currency;
