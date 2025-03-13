// This file will be used to augment the type definitions for Leaflet and React-Leaflet

declare module 'react-leaflet' {
  import { ReactNode } from 'react';
  import { LatLngExpression, Icon, DivIcon } from 'leaflet';
  
  interface MarkerProps {
    position: LatLngExpression;
    icon?: Icon | DivIcon;
    children?: ReactNode;
  }
  
  interface MapContainerProps {
    center: LatLngExpression;
    zoom: number;
    className?: string;
    children?: ReactNode;
  }
  
  interface TileLayerProps {
    attribution: string;
    url: string;
  }
  
  export class MapContainer extends React.Component<MapContainerProps> {}
  export class TileLayer extends React.Component<TileLayerProps> {}
  export class Marker extends React.Component<MarkerProps> {}
  export class Popup extends React.Component<{ children: ReactNode }> {}
} 