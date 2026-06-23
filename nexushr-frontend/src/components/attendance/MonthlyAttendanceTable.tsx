const data = [
     {
          id: 1,
          employee: "Jagan Pushpa",
          present: 22,
          absent: 1,
          late: 2,
          halfDay: 1,
     },
];
const MonthlyAttendanceTable = () => {
     return (
          <div className="bg-card-bg border border-border-primary rounded-2xl overflow-hidden">
               <div className="px-6 py-4 border-b border-border-primary">
                    <h2 className="font-semibold">Monthly Summary</h2>
               </div>

               <table className="w-full">
                    <thead>
                         <tr className="bg-bg-primary text-text-secondary">
                              <th className="p-4 text-left">Employee</th>
                              <th className="p-4 text-left">Present</th>
                              <th className="p-4 text-left">Absent</th>
                              <th className="p-4 text-left">Late</th>
                              <th className="p-4 text-left">Half Day</th>
                         </tr>
                    </thead>

                    <tbody>
                         {data.map((item) => (
                              <tr
                                   key={item.id}
                                   className="border-t border-border-primary"
                              >
                                   <td className="p-4">{item.employee}</td>
                                   <td className="p-4 text-green-400">{item.present}</td>
                                   <td className="p-4 text-red-400">{item.absent}</td>
                                   <td className="p-4 text-yellow-400">{item.late}</td>
                                   <td className="p-4 text-orange-400">{item.halfDay}</td>
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div>
     );
};

export default MonthlyAttendanceTable;