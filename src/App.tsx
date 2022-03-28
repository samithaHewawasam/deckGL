import React, { Component, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapGL from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const accessToken =
  "pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoiY2pwY3owbGFxMDVwNTNxcXdwMms2OWtzbiJ9.1PPVl0VLUQgqrosrI2nUhg";
const App = () => {
  const [mode, setMode] = useState("simple_select");
  const [selected, setSelected] = useState<Array<string>>([]);
  const [features, setFeatures] = useState<any>([]);

  const onDrawSelectionChange = (e: any) => {
    setSelected(e.features);
  };

  const deSelect = () => {
    setMode(mode);
  };

  return (
    <>
      <div className="toolbar">
        <span>Selected {selected.length} Elements</span>
        <span>
          <button onClick={() => deSelect()}>Unselect All</button>
        </span>
        <select onChange={(e) => setMode(e.target.value)}>
          <option value="simple_select">simple select</option>
          <option value="direct_select">direct select</option>
          <option value="draw_line_string">draw line string</option>
        </select>
      </div>

      <MapGL
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        accessToken={accessToken}
        latitude={6.9271}
        longitude={79.8612}
        zoom={10}
      >
        <Draw
          mode={mode}
          onDrawModeChange={({ mode }: any) => setMode(mode)}
          onDrawSelectionChange={(e: any) => onDrawSelectionChange(e)}
          onDrawCreate={({ features }: any) => setFeatures({ features })}
          onDrawUpdate={({ features }: any) => setFeatures({ features })}
        />
      </MapGL>
    </>
  );
};

export default App;
