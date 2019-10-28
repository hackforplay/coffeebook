import * as React from 'react';

export interface MapViewProps {
  selected: number;
  setEditorMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MapView({ selected, setEditorMode }: MapViewProps) {
  return (
    <>
      <h2>Choose background of map{selected}</h2>
      <button onClick={() => setEditorMode(true)}>Apply</button>
    </>
  );
}
