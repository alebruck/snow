import { useLoaderData } from "@remix-run/react";
import KpiGrid from "~/components/KpiGrid";
import { fetchData } from "~/libs/data";

export async function loader() {
  const lifts = fetchData();
  return {
    lifts,
  };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <KpiGrid lifts={data.lifts} />
    </div>
  );
}
