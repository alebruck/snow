import { Link } from "@remix-run/react";
import classNames from "classnames";
import { Lift } from "~/libs/data";

interface LoadStatusProps {
  lift: Lift;
}

function getLoadTextColor(load: number | undefined) {
  if (load === undefined) {
    return "text-gray-500";
  } else if (load < 90) {
    return "text-green-500";
  } else if (load < 95) {
    return "text-yellow-500";
  } else {
    return "text-red-500";
  }
}

function getLoadStatusColor(load: number | undefined) {
  if (load === undefined) {
    return "bg-gray-200";
  } else if (load < 90) {
    return "bg-green-500";
  } else if (load < 95) {
    return "bg-yellow-500";
  } else {
    return "bg-red-500";
  }
}

function getLoadStatusText(load: number | undefined) {
  if (load === undefined) {
    return "Unknown";
  } else if (load < 90) {
    return "Optimal";
  } else if (load < 95) {
    return "Warning";
  } else {
    return "Max Capacity";
  }
}

interface LoadStatusTickProps {
  load: number | undefined;
  forecast?: boolean;
  hourDay: string;
}

function LoadStatusTick({ load, forecast, hourDay }: LoadStatusTickProps) {
  const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [day, hour] = hourDay.split("-").map((x) => parseInt(x));

  const formattedLoad = load ? load.toFixed(0) + "%" : "N/A";
  return (
    <div
      title={`${formattedLoad} load at ${hour} o'clock on ${dayName[day]}`}
      className={classNames(
        "h-2 w-[3.6666%] rounded-sm",
        { "opacity-40": forecast },
        getLoadStatusColor(load)
      )}
    ></div>
  );
}

function generateDayHourList(
  day: number,
  hour: number,
  historicRange: number,
  futureRange: number
) {
  const wrapDay = (d: number) => ((d - 1 + 7) % 7) + 1;
  const wrapHour = (h: number) => (h + 24) % 24;

  const historicHourDayList = [];
  for (let i = -historicRange; i < 0; i++) {
    const offsetDay = wrapDay(day + Math.floor((hour + i) / 24));
    const offsetHour = wrapHour(hour + i);
    historicHourDayList.push(`${offsetDay}-${offsetHour}`);
  }

  historicHourDayList.reverse();

  const forecastedHourDayList = [];
  forecastedHourDayList.push(`${day}-${hour}`);

  for (let i = 1; i <= futureRange; i++) {
    const offsetDay = wrapDay(day + Math.floor((hour + i) / 24));
    const offsetHour = wrapHour(hour + i);
    forecastedHourDayList.push(`${offsetDay}-${offsetHour}`);
  }
  forecastedHourDayList.reverse();

  return { historicHourDayList, forecastedHourDayList };
}

function LoadStatus({ lift: { name, load } }: LoadStatusProps) {
  const day = 4;
  const hour = 12;

  const { historicHourDayList, forecastedHourDayList } = generateDayHourList(
    day,
    hour,
    24,
    4
  );

  const mostRecentLoad = load[`${day}-${hour}`];
  return (
    <Link
      to={`/lifts/${name}/${getLoadStatusText(mostRecentLoad)}`}
      className="flex-1"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-gray-700">{name}</span>
        <span
          className={classNames(
            "font-semibold",
            getLoadTextColor(mostRecentLoad)
          )}
        >
          {getLoadStatusText(mostRecentLoad)}
        </span>
      </div>
      <div className="flex items-center">
        <div className="flex flex-row-reverse gap-[0.5%] w-full">
          {forecastedHourDayList.map((hourDay) => (
            <LoadStatusTick
              key={hourDay}
              load={load[hourDay]}
              hourDay={hourDay}
              forecast={true}
            />
          ))}
          <div className="bg-gray-800 w-1 animate-pulse"></div>
          {historicHourDayList.map((hourDay) => (
            <LoadStatusTick
              key={hourDay}
              load={load[hourDay]}
              hourDay={hourDay}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}

interface RealtimeGridProps {
  lifts: Array<Lift>;
}

export default function RealtimeGrid({ lifts }: RealtimeGridProps) {
  return (
    <div>
      <ul className="mt-3 grid gap-8 grid-cols-4">
        {lifts.map((lift) => (
          <li key={lift.name} className="col-span-1 flex rounded-md shadow-sm">
            <LoadStatus lift={lift} />
          </li>
        ))}
      </ul>
    </div>
  );
}
