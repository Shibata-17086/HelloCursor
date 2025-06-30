import { useState } from 'react';
import { Graph2D } from '../../components/Graph2D';
import { motion } from 'framer-motion';
import { TrendingUp, Zap } from 'lucide-react';

export function Derivatives() {
  const [funcType, setFuncType] = useState<'polynomial' | 'trigonometric' | 'exponential'>('polynomial');
  const [pointX, setPointX] = useState(1);
  const [showTangent, setShowTangent] = useState(true);
  const [showDerivative, setShowDerivative] = useState(true);
  const [deltaX, setDeltaX] = useState(0.5);

  // 関数の定義
  const functions = {
    polynomial: {
      f: (x: number) => x * x * x - 2 * x * x + x,
      df: (x: number) => 3 * x * x - 4 * x + 1,
      name: 'f(x) = x³ - 2x² + x',
      dname: "f'(x) = 3x² - 4x + 1",
    },
    trigonometric: {
      f: (x: number) => Math.sin(x) + 0.5 * Math.cos(2 * x),
      df: (x: number) => Math.cos(x) - Math.sin(2 * x),
      name: 'f(x) = sin(x) + 0.5cos(2x)',
      dname: "f'(x) = cos(x) - sin(2x)",
    },
    exponential: {
      f: (x: number) => Math.exp(x / 2) - x,
      df: (x: number) => 0.5 * Math.exp(x / 2) - 1,
      name: 'f(x) = e^(x/2) - x',
      dname: "f'(x) = 0.5e^(x/2) - 1",
    },
  };

  const currentFunc = functions[funcType];
  const f = currentFunc.f;
  const df = currentFunc.df;

  // グラフデータの生成
  const generateFunctionData = () => {
    const x = [];
    const y = [];
    const dyData = [];
    const range = 4;
    const step = 0.05;

    for (let i = -range; i <= range; i += step) {
      x.push(i);
      y.push(f(i));
      dyData.push(df(i));
    }

    const data = [
      {
        x,
        y,
        name: currentFunc.name,
        color: '#3b82f6',
        type: '2d' as const,
      },
    ];

    // 導関数のグラフ
    if (showDerivative) {
      data.push({
        x,
        y: dyData,
        name: currentFunc.dname,
        color: '#ef4444',
        type: '2d' as const,
      });
    }

    // 接線
    if (showTangent) {
      const slope = df(pointX);
      const yPoint = f(pointX);
      const tangentX = [pointX - 2, pointX + 2];
      const tangentY = tangentX.map(x => slope * (x - pointX) + yPoint);
      
      data.push({
        x: tangentX,
        y: tangentY,
        name: `接線 (傾き = ${slope.toFixed(3)})`,
        color: '#10b981',
        type: '2d' as const,
      });

      // 接点
      data.push({
        x: [pointX],
        y: [yPoint],
        name: `点 (${pointX.toFixed(2)}, ${yPoint.toFixed(2)})`,
        color: '#f59e0b',
        type: '2d' as const,
      });
    }

    // 割線（平均変化率）
    if (deltaX !== 0) {
      const x1 = pointX;
      const x2 = pointX + deltaX;
      const y1 = f(x1);
      const y2 = f(x2);
      
      data.push({
        x: [x1, x2],
        y: [y1, y2],
        name: `平均変化率 = ${((y2 - y1) / deltaX).toFixed(3)}`,
        color: '#8b5cf6',
        type: '2d' as const,
      });
    }

    return data;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">微分</h1>
        <p className="text-lg text-gray-600">
          接線の概念から導関数まで、変化率を視覚的に理解します
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* グラフ表示エリア */}
        <div>
          <Graph2D
            data={generateFunctionData()}
            title="関数と導関数"
            xLabel="x"
            yLabel="y"
            width={500}
            height={450}
          />
        </div>

        {/* コントロールパネル */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">関数の選択</h3>
            
            <div className="space-y-2">
              {Object.entries(functions).map(([key, func]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="function"
                    checked={funcType === key}
                    onChange={() => setFuncType(key as typeof funcType)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">{func.name}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  x = {pointX.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={pointX}
                  onChange={(e) => setPointX(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Δx = {deltaX.toFixed(2)} （平均変化率の区間）
                </label>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.05"
                  value={deltaX}
                  onChange={(e) => setDeltaX(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showTangent}
                  onChange={(e) => setShowTangent(e.target.checked)}
                  className="rounded text-green-600"
                />
                <span className="text-sm">接線を表示</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showDerivative}
                  onChange={(e) => setShowDerivative(e.target.checked)}
                  className="rounded text-red-600"
                />
                <span className="text-sm">導関数を表示</span>
              </label>
            </div>
          </div>

          {/* 微分の値 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              微分の値
            </h3>
            
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <p className="text-sm text-gray-600">瞬間変化率（微分係数）</p>
                <p className="text-2xl font-mono font-bold text-blue-600">
                  f'({pointX.toFixed(2)}) = {df(pointX).toFixed(3)}
                </p>
              </div>

              {deltaX !== 0 && (
                <div className="bg-white rounded p-3">
                  <p className="text-sm text-gray-600">平均変化率</p>
                  <p className="text-2xl font-mono font-bold text-purple-600">
                    {((f(pointX + deltaX) - f(pointX)) / deltaX).toFixed(3)}
                  </p>
                </div>
              )}

              <div className="text-sm text-gray-700">
                <p>
                  Δx → 0 のとき、平均変化率は瞬間変化率に近づきます
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 理論説明 */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold">微分の概念</h2>
        
        <div className="prose max-w-none text-gray-700">
          <p>
            微分は関数の瞬間的な変化率を表す概念で、物理学、経済学、工学など
            幅広い分野で応用されています。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">微分の定義</h3>
              <p className="text-sm mb-2">
                関数 f(x) の x = a における微分係数：
              </p>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                f'(a) = lim[h→0] (f(a+h) - f(a))/h
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">幾何学的意味</h3>
              <ul className="text-sm space-y-1">
                <li>• 曲線上の点における接線の傾き</li>
                <li>• 瞬間的な変化の速さ</li>
                <li>• グラフの増減の指標</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              重要な微分公式
            </h4>
            <ul className="text-sm space-y-1">
              <li>• (xⁿ)' = nxⁿ⁻¹</li>
              <li>• (sin x)' = cos x</li>
              <li>• (cos x)' = -sin x</li>
              <li>• (eˣ)' = eˣ</li>
              <li>• (ln x)' = 1/x</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}