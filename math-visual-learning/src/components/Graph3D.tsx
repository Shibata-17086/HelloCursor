import Plot from 'react-plotly.js';

interface Graph3DProps {
  x: number[];
  y: number[];
  z: number[][];
  title?: string;
  width?: number;
  height?: number;
  colorscale?: string;
}

export function Graph3D({
  x,
  y,
  z,
  title = '',
  width = 700,
  height = 500,
  colorscale = 'Viridis',
}: Graph3DProps) {
  const data: any = [
    {
      type: 'surface',
      x,
      y,
      z,
      colorscale,
      showscale: true,
    },
  ];

  const layout: any = {
    title: {
      text: title,
      font: {
        size: 18,
      },
    },
    scene: {
      xaxis: {
        title: 'X',
        gridcolor: '#e5e7eb',
        backgroundcolor: '#ffffff',
      },
      yaxis: {
        title: 'Y',
        gridcolor: '#e5e7eb',
        backgroundcolor: '#ffffff',
      },
      zaxis: {
        title: 'Z',
        gridcolor: '#e5e7eb',
        backgroundcolor: '#ffffff',
      },
      bgcolor: '#ffffff',
      camera: {
        eye: {
          x: 1.5,
          y: 1.5,
          z: 1.5,
        },
      },
    },
    paper_bgcolor: '#ffffff',
    width,
    height,
    margin: {
      l: 60,
      r: 60,
      t: title ? 60 : 30,
      b: 60,
    },
  };

  const config: any = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d'],
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Plot data={data} layout={layout} config={config} />
    </div>
  );
}