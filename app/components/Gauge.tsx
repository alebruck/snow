const Gauge = ({ percentage }: { percentage: number }) => {
  // Determine color based on percentage
  let color = "";
  if (percentage < 90) color = "text-green-500";
  else if (percentage < 95) color = "text-yellow-500";
  else color = "text-red-500";

  // Define the radius and circumference for the half-circle arc
  const radius = 50;
  const circumference = Math.PI * radius; // Only half the circle

  // Calculate the stroke offset for the SVG arc
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg className="w-40 h-20" viewBox="0 0 120 60">
        {/* Background Arc */}
        <path
          d="
            M 10,60
            A 50,50 0 0,1 110,60
          "
          fill="none"
          stroke="#e5e7eb" // Tailwind's gray-200 color
          strokeWidth="10"
        />
        {/* Gauge Arc */}
        <path
          d="
            M 10,60
            A 50,50 0 0,1 110,60
          "
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          className={`${color} transition-all duration-500`}
        />
      </svg>
      <div className="mt-4 text-2xl font-semibold text-gray-800">
        {percentage.toFixed()}%
      </div>
    </div>
  );
};

export default Gauge;
