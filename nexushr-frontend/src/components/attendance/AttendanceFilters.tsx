const AttendanceFilters = () => {
  return (
    <div
      className="
      bg-[#0f172a]
      border
      border-slate-800
      rounded-2xl
      p-6
      flex
      gap-4
      flex-wrap
    ">
      <input
        type="date"
        className="
        bg-slate-900
        border
        border-slate-700
        rounded-xl
        px-4
        py-2
        text-white
      "
      />

      <select
        className="
        bg-slate-900
        border
        border-slate-700
        rounded-xl
        px-4
        py-2
        text-white
      ">
        <option>All Status</option>
        <option>PRESENT</option>
        <option>ABSENT</option>
        <option>LATE</option>
      </select>

      <button
        className="
        px-4
        py-2
        bg-orange-500
        hover:bg-orange-600
        rounded-xl
        text-white
      ">
        Search
      </button>
    </div>
  );
};

export default AttendanceFilters;
