import { useLoaderData } from "@remix-run/react";
import Gauge from "~/components/Gauge";
import KpiGrid from "~/components/KpiGrid";
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

  return (
    <div>
      <dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3 mb-4">
        <div className="flex flex-col bg-gray-400/5 p-8">
          <dt className="text-sm/6 font-semibold text-gray-600">
            Average of Current Load
          </dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
            <Gauge percentage={averageLoad} />
          </dd>
        </div>
        <div className="flex flex-col bg-gray-400/5 p-8">
          <dt className="text-sm/6 font-semibold text-gray-600">
            Average of Maximum Load
          </dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
            <Gauge percentage={75} />
          </dd>
        </div>
        <div className="flex flex-col bg-gray-400/5 p-8">
          <dt className="text-sm/6 font-semibold text-gray-600">
            At Max Capacity
          </dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
            <Gauge percentage={(1 / 39) * 100} />
          </dd>
        </div>
      </dl>
      <KpiGrid lifts={data.lifts} />
    </div>
  );
}

// KPIS: real capacity, theoretical capacity, current capacity

// average of current load
// average of grid values
// percentage of red ones
