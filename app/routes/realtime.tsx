import { useLoaderData } from "@remix-run/react";
import RealtimeGrid from "~/components/RealtimeGrid";
import { fetchData } from "~/libs/data";

export async function loader() {
  const lifts = fetchData();
  return {
    lifts,
  };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <RealtimeGrid lifts={data.lifts} />;
}
