
const leave = [{ id: 1, employee: { firstName: "John", lastName: "Doe" }, leaveType: "Sick Leave", startDate: "2022-01-01", endDate: "2022-01-05", status: "Pending" }]
const LeaveTable = () => {
     // const { leave } = useAppSelector(
     //      (store) => store
     // );

     return (
          <div className="bg-card-bg border border-border-primary rounded-2xl overflow-hidden">
               <div className="px-6 py-4 border-b border-border-primary">
                    <h2 className="font-semibold">
                         Leave Requests
                    </h2>
               </div>

               <table className="w-full">
                    <thead>
                         <tr className="bg-bg-primary text-text-secondary">
                              <th className="p-4 text-left">
                                   Employee
                              </th>
                              <th className="p-4 text-left">
                                   Type
                              </th>
                              <th className="p-4 text-left">
                                   Start
                              </th>
                              <th className="p-4 text-left">
                                   End
                              </th>
                              <th className="p-4 text-left">
                                   Status
                              </th>
                         </tr>
                    </thead>

                    <tbody>
                         {leave.map((item) => (
                              <tr
                                   key={item.id}
                                   className="border-t border-border-primary">
                                   <td className="p-4">
                                        {item.employee.firstName}{" "}
                                        {item.employee.lastName}
                                   </td>

                                   <td className="p-4">
                                        {item.leaveType}
                                   </td>

                                   <td className="p-4">
                                        {item.startDate}
                                   </td>

                                   <td className="p-4">
                                        {item.endDate}
                                   </td>

                                   <td className="p-4">
                                        {item.status}
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div>
     );
};

export default LeaveTable;