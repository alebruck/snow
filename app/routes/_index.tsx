import { useLoaderData } from "@remix-run/react";
import GridList from "~/components/GridList";
import { fetchData } from "~/libs/data";

export async function loader() {
  const lifts = fetchData();
  return {
    lifts,
  };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <GridList lifts={data.lifts} />;
}
