interface PayrollItem {
  itemName: string;
  itemType: "EARNING" | "DEDUCTION";
  amount: number;
}

interface PayrollItemsTableProps {
  items: PayrollItem[];
}

const PayrollItemsTable = ({ items }: PayrollItemsTableProps) => {
  return (
    <div
      className="
        bg-[#020817]
        border
        border-slate-800
        rounded-2xl
        overflow-hidden
      ">
      <div className="px-5 py-4 border-b border-slate-800">
        <h3 className="text-lg font-semibold text-white">Payroll Items</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-5 py-3 text-left text-sm text-slate-400">Item Name</th>

              <th className="px-5 py-3 text-left text-sm text-slate-400">Type</th>

              <th className="px-5 py-3 text-right text-sm text-slate-400">Amount</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-slate-800">
                <td className="px-5 py-4 text-white">{item.itemName}</td>

                <td className="px-5 py-4">
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${item.itemType === "EARNING" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}
                    `}>
                    {item.itemType}
                  </span>
                </td>

                <td
                  className={`
                    px-5
                    py-4
                    text-right
                    font-medium
                    ${item.itemType === "EARNING" ? "text-green-400" : "text-red-400"}
                  `}>
                  ₹ {item.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollItemsTable;
