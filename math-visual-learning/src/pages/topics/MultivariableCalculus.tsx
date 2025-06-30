import { useState } from 'react';
import { Graph3D } from '../../components/Graph3D';
import { Graph2D } from '../../components/Graph2D';
import { motion } from 'framer-motion';
import { Mountain, TrendingUp, Map } from 'lucide-react';

export function MultivariableCalculus() {
  const [funcType, setFuncType] = useState<'saddle' | 'paraboloid' | 'wave'>('saddle');
  const [pointX, setPointX] = useState(0.5);
  const [pointY, setPointY] = useState(0.5);
  const [showGradient, setShowGradient] = useState(true);
  const [showContour, setShowContour] = useState(true);

  // 関数の定義
  const functions = {
    saddle: {
      f: (x: number, y: number) => x * x - y * y,
      fx: (x: number, y: number) => 2 * x,
      fy: (x: number, y: number) => -2 * y,
      name: 'f(x,y) = x² - y²',
      description: '鞍点を持つ関数',
    },
    paraboloid: {
      f: (x: number, y: number) => x * x + y * y,
      fx: (x: number, y: number) => 2 * x,
      fy: (x: number, y: number) => 2 * y,
      name: 'f(x,y) = x² + y²',
      description: '回転放物面',
    },
    wave: {
      f: (x: number, y: number) => Math.sin(2 * x) * Math.cos(2 * y),
      fx: (x: number, y: number) => 2 * Math.cos(2 * x) * Math.cos(2 * y),
      fy: (x: number, y: number) => -2 * Math.sin(2 * x) * Math.sin(2 * y),
      name: 'f(x,y) = sin(2x)cos(2y)',
      description: '波状関数',
    },
  };

  const currentFunc = functions[funcType];

  // 3Dグラフ用のデータ生成
  const generate3DData = () => {
    const size = 30;
    const range = 2;
    const x = [];
    const y = [];
    const z = [];

    for (let i = 0; i < size; i++) {
      const xi = -range + (2 * range * i) / (size - 1);
      x.push(xi);
      y.push(xi);
    }

    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(currentFunc.f(x[j], y[i]));
      }
      z.push(row);
    }

    return { x, y, z };
  };

  // 等高線データの生成
  const generateContourData = () => {
    const contourLevels = 8;
    const range = 2;
    const data: any[] = [];

    if (!showContour) return data;

    // 等高線を計算
    const minZ = -2;
    const maxZ = 2;
    
    for (let level = 0; level < contourLevels; level++) {
      const z = minZ + (maxZ - minZ) * level / (contourLevels - 1);
      const contourX = [];
      const contourY = [];

      // 簡易的な等高線の近似
      for (let angle = 0; angle < 360; angle += 5) {
        const rad = (angle * Math.PI) / 180;
        for (let r = 0.1; r < range; r += 0.1) {
          const x = r * Math.cos(rad);
          const y = r * Math.sin(rad);
          const fVal = currentFunc.f(x, y);
          
          if (Math.abs(fVal - z) < 0.1) {
            contourX.push(x);
            contourY.push(y);
          }
        }
      }

      if (contourX.length > 0) {
        data.push({
          x: contourX,
          y: contourY,
          name: `z = ${z.toFixed(1)}`,
          color: `hsl(${240 - level * 30}, 70%, 50%)`,
          type: '2d' as const,
        });
      }
    }

    // 勾配ベクトル
    if (showGradient) {
      const gradX = currentFunc.fx(pointX, pointY);
      const gradY = currentFunc.fy(pointX, pointY);
      const scale = 0.3;

      data.push({
        x: [pointX, pointX + scale * gradX],
        y: [pointY, pointY + scale * gradY],
        name: `∇f = (${gradX.toFixed(2)}, ${gradY.toFixed(2)})`,
        color: '#ef4444',
        type: '2d' as const,
      });

      // 現在の点
      data.push({
        x: [pointX],
        y: [pointY],
        name: `(${pointX.toFixed(2)}, ${pointY.toFixed(2)})`,
        color: '#f59e0b',
        type: '2d' as const,
      });
    }

    return data;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">多変数微積分</h1>
        <p className="text-lg text-gray-600">
          偏微分、勾配、等高線を3Dで視覚化します
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 3Dグラフ */}
        <div>
          <Graph3D
            {...generate3DData()}
            title="3D曲面"
            width={500}
            height={450}
          />
        </div>

        {/* 等高線図 */}
        <div>
          <Graph2D
            data={generateContourData()}
            title="等高線と勾配ベクトル"
            xLabel="x"
            yLabel="y"
            width={500}
            height={450}
          />
        </div>
      </div>

      {/* コントロールパネル */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Mountain className="w-5 h-5" />
          関数と設定
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">関数の選択</h4>
            <div className="space-y-2">
              {Object.entries(functions).map(([key, func]) => (
                <label key={key} className="flex items-start space-x-2">
                  <input
                    type="radio"
                    name="function"
                    checked={funcType === key}
                    onChange={() => setFuncType(key as typeof funcType)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium text-sm">{func.name}</p>
                    <p className="text-xs text-gray-600">{func.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">評価点の座標</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  x = {pointX.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-1.5"
                  max="1.5"
                  step="0.1"
                  value={pointX}
                  onChange={(e) => setPointX(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  y = {pointY.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-1.5"
                  max="1.5"
                  step="0.1"
                  value={pointY}
                  onChange={(e) => setPointY(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showGradient}
                  onChange={(e) => setShowGradient(e.target.checked)}
                  className="rounded text-red-600"
                />
                <span className="text-sm">勾配ベクトルを表示</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showContour}
                  onChange={(e) => setShowContour(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span className="text-sm">等高線を表示</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 計算結果 */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-700 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            関数値
          </h4>
          <p className="text-2xl font-mono mt-2">
            f({pointX.toFixed(2)}, {pointY.toFixed(2)}) = {currentFunc.f(pointX, pointY).toFixed(3)}
          </p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-semibold text-red-700">偏微分</h4>
          <p className="font-mono mt-2">
            ∂f/∂x = {currentFunc.fx(pointX, pointY).toFixed(3)}<br/>
            ∂f/∂y = {currentFunc.fy(pointX, pointY).toFixed(3)}
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-700">勾配の大きさ</h4>
          <p className="text-2xl font-mono mt-2">
            |∇f| = {Math.sqrt(
              currentFunc.fx(pointX, pointY) ** 2 + 
              currentFunc.fy(pointX, pointY) ** 2
            ).toFixed(3)}
          </p>
        </div>
      </div>

      {/* 理論説明 */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold">多変数関数の微分</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">偏微分</h3>
            <p className="text-sm text-gray-700 mb-3">
              他の変数を固定して、1つの変数で微分
            </p>
            <div className="bg-gray-50 p-3 rounded space-y-2 font-mono text-sm">
              <p>∂f/∂x = lim[h→0] (f(x+h,y) - f(x,y))/h</p>
              <p>∂f/∂y = lim[h→0] (f(x,y+h) - f(x,y))/h</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">勾配ベクトル</h3>
            <p className="text-sm text-gray-700 mb-3">
              最大増加方向を示すベクトル
            </p>
            <div className="bg-gray-50 p-3 rounded font-mono text-sm">
              <p>∇f = (∂f/∂x, ∂f/∂y)</p>
            </div>
            <ul className="mt-3 text-sm space-y-1 text-gray-700">
              <li>• 等高線に垂直</li>
              <li>• 最急上昇方向</li>
              <li>• 大きさは変化率</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}