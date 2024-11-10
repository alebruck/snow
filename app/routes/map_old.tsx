import DeckGL from "@deck.gl/react";
import { TerrainLayer } from "@deck.gl/geo-layers";

import type { MapViewState } from "@deck.gl/core";
import type { TerrainLayerProps } from "@deck.gl/geo-layers";
import { useLoaderData } from "@remix-run/react";
import { fetchData } from "~/libs/data";
import { HeatmapLayer } from "deck.gl";
import { _TerrainExtension as TerrainExtension } from "@deck.gl/extensions";

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 47.0404601,
  longitude: 10.5445644,
  zoom: 13,
  pitch: 55,
  maxZoom: 13.5,
  bearing: 0,
  maxPitch: 89,
};

// https://docs.mapbox.com/help/troubleshooting/access-elevation-data/#mapbox-terrain-rgb
// Note - the elevation rendered by this example is greatly exagerated!
const ELEVATION_DECODER: TerrainLayerProps["elevationDecoder"] = {
  rScaler: 6553.6,
  gScaler: 25.6,
  bScaler: 0.1,
  offset: -10000,
};

export async function loader() {
  const lifts = fetchData();

  return {
    lifts,
    ENV: {
      MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    },
  };
}

export default function Map() {
  const {
    ENV: { MAPBOX_TOKEN },
    lifts,
  } = useLoaderData<typeof loader>();

  const data = lifts.map((lift) => ({
    coordinates: [lift.longitude, lift.latitude, 5000],
    weight: lift.load["4-24"] || 0,
  }));

  const TERRAIN_IMAGE = `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.png?access_token=${MAPBOX_TOKEN}`;
  const SURFACE_IMAGE = `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=${MAPBOX_TOKEN}`;

  const layers = [
    new TerrainLayer({
      id: "terrain",
      minZoom: 0,
      strategy: "no-overlap",
      elevationDecoder: ELEVATION_DECODER,
      elevationData: TERRAIN_IMAGE,
      texture: SURFACE_IMAGE,
      wireframe: false,
      color: [255, 255, 255],
      operation: "terrain+draw",
    }),
    new HeatmapLayer({
      id: "HeatmapLayer",
      data: data,
      aggregation: "SUM",
      getPosition: (d) => d.coordinates,
      getWeight: (d) => d.weight,
      radiusPixels: 25,
      extensions: [new TerrainExtension()],
    }),
  ];

  return (
    <div className="relative w-full h-full">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={layers}
      />
    </div>
  );
}
