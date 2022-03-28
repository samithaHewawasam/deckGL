import React, { Component, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoiY2pwY3owbGFxMDVwNTNxcXdwMms2OWtzbiJ9.1PPVl0VLUQgqrosrI2nUhg";
const App = () => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng, setLng] = useState(79.8612); //set colombo, Srilanka
  const [lat, setLat] = useState(6.9271); //set colombo, Srilanka
  const [zoom, setZoom] = useState(10);
  const [selected, setSelected] = useState<Array<string>>([]);

  /**
   * @description enable mapBox Drawer instance.
   * @param options.styles set active and inactive styles
   */
  const draw = new MapboxDraw({
    styles: [
      {
        id: "gl-draw-polygon-fill-inactive",
        type: "fill",
        filter: [
          "all",
          ["==", "active", "false"],
          ["==", "$type", "Polygon"],
          ["!=", "mode", "static"],
        ],
        paint: {
          "fill-color": [
            "case",
            ["==", ["get", "user_class_id"], 1],
            "#00ff00",
            ["==", ["get", "user_class_id"], 2],
            "#0000ff",
            "#ff0000",
          ],
          "fill-outline-color": "#3bb2d0",
          "fill-opacity": 0.5,
        },
      },
      {
        id: "gl-draw-polygon-fill-active",
        type: "fill",
        filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
        paint: {
          "fill-color": "purple",
          "fill-outline-color": "#000",
        },
      },
    ],
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v9",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    try {
      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on("load", function () {
      console.log("map loaded");
      map.current.addControl(draw);

      /**
       * @description when user select an element. Press SHIFT + click for multiple elements
       */
      map.current.on("draw.selectionchange", function () {
        try {
          draw && setSelected(draw.getSelectedIds());
        } catch (error) {
          console.error(error);
        }
      });
    });
  });

  const changeMode = (e: any) => {
    console.log(draw)
  };

  return (
    <div>
      <div className="toolbar">
        <span>Selected {selected.length} Elements</span>
        <span>
          <button onClick={() => {}}>Unselect All</button>
        </span>

        <span>
          <select onChange={(e) => changeMode(e)}>
            <option value="simple_select">simple select</option>
            <option value="direct_select">direct select</option>
            <option value="draw_line_string">draw line string</option>
          </select>
        </span>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default App;
