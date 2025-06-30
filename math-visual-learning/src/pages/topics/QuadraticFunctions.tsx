import { useState } from 'react';
import { Graph2D } from '../../components/Graph2D';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function QuadraticFunctions() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [showVertex, setShowVertex] = useState(true);
  const [showAxis, setShowAxis] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // 頂点の計算
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;

  // グラフデータの生成
  const generateData = () => {
    const x = [];
    const y = [];
    const range = 5;
    const step = 0.1;

    for (let i = -range; i <= range; i += step) {
      x.push(i);
      y.push(a * i * i + b * i + c);
    }

    const data = [
      {
        x,
        y,
        name: `y = ${a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`,
        color: '#3b82f6',
        type: '2d' as const,
      },
    ];

    // 頂点を表示
    if (showVertex) {
      data.push({
        x: [vertexX],
        y: [vertexY],
        name: `頂点(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`,
        color: '#ef4444',
        type: '2d' as const,
      });
    }

    // 軸を表示
    if (showAxis) {
      data.push({
        x: [vertexX, vertexX],
        y: [-10, 10],
        name: `軸 x = ${vertexX.toFixed(2)}`,
        color: '#10b981',
        type: '2d' as const,
      });
    }

    return data;
  };

  const handleReset = () => {
    setA(1);
    setB(0);
    setC(0);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">二次関数</h1>
        <p className="text-lg text-gray-600">
          放物線の性質を視覚的に理解し、頂点、軸、判別式について学びます
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* グラフ表示エリア */}
        <div>
          <Graph2D
            data={generateData()}
            title="二次関数のグラフ"
            xLabel="x"
            yLabel="y"
            width={500}
            height={400}
          />
        </div>

        {/* コントロールパネル */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">パラメータ調整</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  a = {a}
                </label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={a}
                  onChange={(e) => setA(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  b = {b}
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={b}
                  onChange={(e) => setB(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  c = {c}
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={c}
                  onChange={(e) => setC(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showVertex}
                  onChange={(e) => setShowVertex(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">頂点を表示</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showAxis}
                  onChange={(e) => setShowAxis(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">軸を表示</span>
              </label>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              リセット
            </button>
          </div>

          {/* 情報表示エリア */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">関数の性質</h3>
            
            <div className="space-y-2 text-sm">
              <p>
                <strong>一般形:</strong> y = {a}x² {b >= 0 ? '+' : ''}{b}x {c >= 0 ? '+' : ''}{c}
              </p>
              <p>
                <strong>頂点:</strong> ({vertexX.toFixed(2)}, {vertexY.toFixed(2)})
              </p>
              <p>
                <strong>軸:</strong> x = {vertexX.toFixed(2)}
              </p>
              <p>
                <strong>開き方:</strong> {a > 0 ? '上に開く' : '下に開く'}
              </p>
              <p>
                <strong>判別式 D = b² - 4ac:</strong> {(b * b - 4 * a * c).toFixed(2)}
              </p>
              <p>
                <strong>x軸との交点:</strong>{' '}
                {b * b - 4 * a * c > 0
                  ? '2点で交わる'
                  : b * b - 4 * a * c === 0
                  ? '1点で接する'
                  : '交点なし'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 理論説明 */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold">二次関数の基本</h2>
        
        <div className="prose max-w-none">
          <p className="text-gray-700">
            二次関数 y = ax² + bx + c は、最も基本的な関数の一つです。
            そのグラフは放物線と呼ばれ、物体の投射運動や最適化問題など、
            様々な場面で現れます。
          </p>

          <h3 className="text-xl font-semibold mt-4">重要な性質</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>係数 a:</strong> 放物線の開き方と開く向きを決定します。
              |a|が大きいほど急な放物線になります。
            </li>
            <li>
              <strong>頂点:</strong> 放物線の最高点または最低点で、
              座標は (-b/2a, f(-b/2a)) で与えられます。
            </li>
            <li>
              <strong>軸:</strong> 頂点を通る垂直線 x = -b/2a です。
              放物線はこの軸に関して対称です。
            </li>
            <li>
              <strong>判別式 D = b² - 4ac:</strong> x軸との交点の個数を決定します。
              D &gt; 0なら2点、D = 0なら1点、D &lt; 0なら交点なしです。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}