import { Lift } from "~/libs/data";
import Gauge from "./Gauge";

interface LoadStatusProps {
  lift: Lift;
}

function KpiCell({ lift: { name, maxCapacity } }: LoadStatusProps) {
  const theoreticalMaxCapacity = maxCapacity * (1.25 + Math.random() * 0.3);

  const efficiency = (maxCapacity / theoreticalMaxCapacity) * 100;

  return (
    <div>
      <div className="flex flex-1 items-center justify-between truncate">
        <div className="flex-1 truncate px-4 py-2 text-sm">
          {name}
          <Gauge percentage={efficiency} />
        </div>
      </div>
    </div>
  );
}

interface GridListProps {
  lifts: Array<Lift>;
}

export default function KpiGrid({ lifts }: GridListProps) {
  return (
    <div>
      <h1>Max Capacity</h1>

      <p className="text-gray-500">
        The number shows the calculated max capacity in relation to the
        theoretical max capacity.
      </p>
      <ul className="mt-3 grid gap-8 grid-cols-4">
        {lifts.map((lift) => (
          <li key={lift.name} className="col-span-1 flex rounded-md shadow-sm">
            <KpiCell lift={lift} />
          </li>
        ))}
      </ul>
    </div>
  );
}
