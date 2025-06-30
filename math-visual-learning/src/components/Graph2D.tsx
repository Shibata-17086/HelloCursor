import Plot from 'react-plotly.js';
import type { PlotData } from '../types';

interface Graph2DProps {
  data: PlotData[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  width?: number;
  height?: number;
}

export function Graph2D({
  data,
  title = '',
  xLabel = 'x',
  yLabel = 'y',
  width = 600,
  height = 400,
}: Graph2DProps) {
  const plotlyData = data.map((d) => ({
    x: d.x,
    y: d.y,
    type: 'scatter' as const,
    mode: 'lines' as const,
    name: d.name || '',
    line: {
      color: d.color || '#3b82f6',
      width: 2,
    },
  }));

  const layout: any = {
    title: {
      text: title,
      font: {
        size: 18,
      },
    },
    xaxis: {
      title: {
        text: xLabel,
      },
      gridcolor: '#e5e7eb',
    },
    yaxis: {
      title: {
        text: yLabel,
      },
      gridcolor: '#e5e7eb',
    },
    plot_bgcolor: '#ffffff',
    paper_bgcolor: '#ffffff',
    width,
    height,
    margin: {
      l: 60,
      r: 30,
      t: title ? 60 : 30,
      b: 60,
    },
    showlegend: data.length > 1,
    legend: {
      x: 1,
      xanchor: 'right',
      y: 1,
    },
  };

  const config: any = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d', 'autoScale2d'],
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Plot data={plotlyData} layout={layout} config={config} />
    </div>
  );
}