import React from "react";

function Equity() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2"></th>
            <th className="border border-gray-300 px-4 py-2">Equity Delivery</th>
            <th className="border border-gray-300 px-4 py-2">Equity Intraday</th>
            <th className="border border-gray-300 px-4 py-2">F&O - Futures</th>
            <th className="border border-gray-300 px-4 py-2">F&O - Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Brokerage</td>
            <td className="border border-gray-300 px-4 py-2">Zero Brokerage</td>
            <td className="border border-gray-300 px-4 py-2">0.03% or ₹20/executed order</td>
            <td className="border border-gray-300 px-4 py-2">0.03% or ₹20/executed order</td>
            <td className="border border-gray-300 px-4 py-2">₹20 per executed order</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">STT/CTT</td>
            <td className="border border-gray-300 px-4 py-2">0.1% on buy & sell</td>
            <td className="border border-gray-300 px-4 py-2">0.025% on sell side</td>
            <td className="border border-gray-300 px-4 py-2">0.02% on sell side</td>
            <td className="border border-gray-300 px-4 py-2">
              <ul className="list-disc ml-5">
                <li>0.125% of intrinsic value on options bought and exercised</li>
                <li>0.1% on sell side (on premium)</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Transaction charges</td>
            <td className="border border-gray-300 px-4 py-2">NSE: 0.00297% BSE: 0.00375%</td>
            <td className="border border-gray-300 px-4 py-2">NSE: 0.00297% BSE: 0.00375%</td>
            <td className="border border-gray-300 px-4 py-2">NSE: 0.00173% BSE: 0</td>
            <td className="border border-gray-300 px-4 py-2">NSE: 0.03503% BSE: 0.0325%</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">GST</td>
            <td className="border border-gray-300 px-4 py-2" colSpan={4}>
              18% on (brokerage + SEBI charges + transaction charges)
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">SEBI charges</td>
            <td className="border border-gray-300 px-4 py-2">₹10 / crore</td>
            <td className="border border-gray-300 px-4 py-2">₹10 / crore</td>
            <td className="border border-gray-300 px-4 py-2">₹10 / crore</td>
            <td className="border border-gray-300 px-4 py-2">₹10 / crore</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Stamp charges</td>
            <td className="border border-gray-300 px-4 py-2">0.015% or ₹1500 / crore on buy side</td>
            <td className="border border-gray-300 px-4 py-2">0.003% or ₹300 / crore on buy side</td>
            <td className="border border-gray-300 px-4 py-2">0.002% or ₹200 / crore on buy side</td>
            <td className="border border-gray-300 px-4 py-2">0.003% or ₹300 / crore on buy side</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Equity;
