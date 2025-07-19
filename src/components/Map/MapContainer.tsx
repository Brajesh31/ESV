import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { HeatmapPoint, Species } from '../../types/species';

interface MapContainerProps {
  heatmapPoints: HeatmapPoint[];
  onPointClick: (species: Species[]) => void;
}

// You'll need to replace this with your own Mapbox token
const MAPBOX_TOKEN = 'pk.eyJ1IjoiaGFhemlxY29kZSIsImEiOiJjbWM1djRxb3kwa3B6MmtweXE2b3gxYW5tIn0.JQ9mOa1Z6QM5Ou9CFYYbvQ';

const MapContainer: React.FC<MapContainerProps> = ({ heatmapPoints, onPointClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    // More precise Ontario bounding box coordinates
    const ontarioBounds: [number, number, number, number] = [-95.2, 41.7, -74.3, 56.9];

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-84.5, 50.0], // Center of Ontario
      zoom: 5.5,
      minZoom: 4, // Prevent zooming out too far
      maxZoom: 18, // Allow detailed zoom
      maxBounds: ontarioBounds, // Restrict panning to Ontario
      antialias: true
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Fit map to Ontario bounds on load
    map.current.on('load', () => {
      map.current!.fitBounds([
        [-95.2, 41.7], // Southwest corner
        [-74.3, 56.9]  // Northeast corner
      ], {
        padding: 20
      });
      setMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Remove existing sources and layers
    if (map.current.getSource('heatmap-data')) {
      map.current.removeLayer('heatmap-layer');
      map.current.removeLayer('heatmap-points');
      map.current.removeSource('heatmap-data');
    }

    // Create GeoJSON data from heatmap points
    const geojsonData = {
      type: 'FeatureCollection' as const,
      features: heatmapPoints.map((point, index) => ({
        type: 'Feature' as const,
        properties: {
          weight: point.weight,
          speciesCount: point.species.length,
          id: index
        },
        geometry: {
          type: 'Point' as const,
          coordinates: point.coordinates
        }
      }))
    };

    // Add source
    map.current.addSource('heatmap-data', {
      type: 'geojson',
      data: geojsonData
    });

    // Add heatmap layer with red gradient
    map.current.addLayer({
      id: 'heatmap-layer',
      type: 'heatmap',
      source: 'heatmap-data',
      maxzoom: 15,
      paint: {
        'heatmap-weight': {
          property: 'weight',
          type: 'exponential',
          stops: [
            [0, 0],
            [1, 1]
          ]
        },
        'heatmap-intensity': {
          stops: [
            [0, 1],
            [15, 3]
          ]
        },
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(255, 0, 0, 0)',      // Transparent
          0.1, 'rgba(255, 255, 0, 0.1)', // Very light yellow
          0.2, 'rgba(255, 200, 0, 0.3)', // Light orange
          0.4, 'rgba(255, 150, 0, 0.5)', // Orange
          0.6, 'rgba(255, 100, 0, 0.7)', // Dark orange
          0.8, 'rgba(255, 50, 0, 0.8)',  // Red-orange
          1, 'rgba(255, 0, 0, 1)'        // Pure red (hottest)
        ],
        'heatmap-radius': {
          stops: [
            [0, 20],
            [15, 40]
          ]
        },
        'heatmap-opacity': {
          default: 1,
          stops: [
            [14, 1],
            [15, 0]
          ]
        }
      }
    });

    // Add points layer for higher zoom levels with red theme
    map.current.addLayer({
      id: 'heatmap-points',
      type: 'circle',
      source: 'heatmap-data',
      minzoom: 14,
      paint: {
        'circle-radius': {
          property: 'speciesCount',
          type: 'exponential',
          stops: [
            [1, 8],
            [5, 20]
          ]
        },
        'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 'weight'],
          0, '#FF6B6B',    // Light red
          0.5, '#FF3333',  // Medium red
          1, '#CC0000'     // Dark red
        ],
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',
        'circle-opacity': 0.8
      }
    });

    // Add click handlers
    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      const features = map.current!.queryRenderedFeatures(e.point, {
        layers: ['heatmap-points']
      });

      if (features.length > 0) {
        const pointId = features[0].properties?.id;
        if (pointId !== undefined) {
          const clickedPoint = heatmapPoints[pointId];
          if (clickedPoint) {
            onPointClick(clickedPoint.species);
          }
        }
      }
    };

    map.current.on('click', 'heatmap-points', handleMapClick);

    // Change cursor on hover
    map.current.on('mouseenter', 'heatmap-points', () => {
      map.current!.getCanvas().style.cursor = 'pointer';
    });

    map.current.on('mouseleave', 'heatmap-points', () => {
      map.current!.getCanvas().style.cursor = '';
    });

    return () => {
      if (map.current) {
        map.current.off('click', 'heatmap-points', handleMapClick);
      }
    };
  }, [heatmapPoints, mapLoaded, onPointClick]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full"
      style={{ minHeight: '500px' }}
    />
  );
};

export default MapContainer;