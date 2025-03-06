import React from "react";

function Commodity() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2"></th>
            <th className="border border-gray-300 px-4 py-2">Commodity Futures</th>
            <th className="border border-gray-300 px-4 py-2">Commodity Options</th>
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
            <td className="border border-gray-300 px-4 py-2">0.01% on sell side (Non-Agri)</td>
            <td className="border border-gray-300 px-4 py-2">0.05% on sell side</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Transaction charges</td>
            <td className="border border-gray-300 px-4 py-2">MCX: 0.0021% NSE: 0.0001%</td>
            <td className="border border-gray-300 px-4 py-2">MCX: 0.0418% NSE: 0.001%</td>
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
            <td className="border border-gray-300 px-4 py-2">
              <b>Agri:</b>
              <br /> ₹1 / crore <br />
              <b>Non-agri:</b>
              <br /> ₹10 / crore
            </td>
            <td className="border border-gray-300 px-4 py-2">₹10 / crore</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Stamp charges</td>
            <td className="border border-gray-300 px-4 py-2">0.002% or ₹200 / crore on buy side</td>
            <td className="border border-gray-300 px-4 py-2">0.003% or ₹300 / crore on buy side</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Commodity;
