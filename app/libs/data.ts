import data from "./data.json";
import geoList from "./geodata.json";
import capacity from "./capacity.json";

export interface Lift {
  name: string;
  latitude: number | undefined;
  longitude: number | undefined;
  load: Record<string, number>;
  maxCapacity: number;
  theoreticalMaxCapacity: number;
}

export function fetchData(): Array<Lift> {
  return data.reduce(
    (
      acc,
      { lift, percentage_of_max, max_count_per_day, day_of_week, hour_of_day }
    ) => {
      if (acc.length === 0 || acc[acc.length - 1].name !== lift) {
        const geo = geoList.find((geo) => geo.skidata_name === lift);
        const capacityData = capacity.find((c) => c.name === lift);
        acc.push({
          name: lift,
          latitude: geo?.latitude,
          longitude: geo?.longitude,
          load: {},
          maxCapacity: 0,
          theoreticalMaxCapacity: capacityData?.theoreticalMaxCapacity || 0,
        });
      }
      acc[acc.length - 1].load[`${day_of_week}-${hour_of_day}`] =
        percentage_of_max;

      acc[acc.length - 1].maxCapacity = Math.max(
        acc[acc.length - 1].maxCapacity || 0,
        max_count_per_day
      );
      return acc;
    },
    [] as Array<Lift>
  );
}
