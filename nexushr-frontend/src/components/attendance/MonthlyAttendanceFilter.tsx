const MonthlyAttendanceFilter = () => {
     return (
          <div className="bg-card-bg border border-border-primary rounded-2xl p-6">
               <div className="grid md:grid-cols-3 gap-4">
                    <input
                         type="month"
                         className="bg-slate-900 border border-slate-700 rounded-xl p-3"
                    />

                    <select
                         className="bg-slate-900 border border-slate-700 rounded-xl p-3"
                    >
                         <option>All Departments</option>
                    </select>

                    <button
                         className="bg-accent hover:bg-accent-hover rounded-xl px-4"
                    >
                         Generate Report
                    </button>
               </div>
          </div>
     );
};

export default MonthlyAttendanceFilter;