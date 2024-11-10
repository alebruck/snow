import { Link, useLoaderData } from "@remix-run/react";
import Gauge from "~/components/Gauge";
import { fetchData, Lift } from "~/libs/data";

export async function loader() {
  const lifts = fetchData();
  return {
    lifts,
  };
}

function getMostRecentLoads(lifts: Array<Lift>, day: number, hour: number) {
  return lifts.map((lift) => {
    return lift.load[`${day}-${hour}`];
  });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  const averageLoad =
    getMostRecentLoads(data.lifts, 4, 12).reduce((acc, load) => {
      return acc + load;
    }, 0) / data.lifts.length;

  const averageOfMaxCapacity =
    data.lifts.reduce((acc, lift) => {
      return acc + (lift.maxCapacity / lift.theoreticalMaxCapacity) * 100;
    }, 0) / data.lifts.length;

  return (
    <div className="flex-1">
      <dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3 mb-4">
        <Link to="/realtime" className="flex flex-col bg-gray-400/5 p-8">
          <dt className="text-sm/6 font-semibold text-gray-600">
            Average of Current Load
          </dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
            <Gauge percentage={averageLoad} />
          </dd>
        </Link>
        <Link to="/capacity" className="flex flex-col bg-gray-400/5 p-8">
          <dt className="text-sm/6 font-semibold text-gray-600">
            Average Lift Efficency
          </dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
            <Gauge percentage={averageOfMaxCapacity} />
          </dd>
        </Link>
        <Link to="/realtime" className="flex flex-col bg-gray-400/5 p-8">
          <dt className="text-sm/6 font-semibold text-gray-600">
            At Max Capacity
          </dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
            <Gauge percentage={(1 / 39) * 100} />
          </dd>
        </Link>
      </dl>
    </div>
  );
}

// KPIS: real capacity, theoretical capacity, current capacity

// average of current load
// average of grid values
// percentage of red ones
