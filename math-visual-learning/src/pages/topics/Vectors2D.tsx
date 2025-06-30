import { useState } from 'react';
import { Graph2D } from '../../components/Graph2D';
import { motion } from 'framer-motion';
import { Plus, Minus, X } from 'lucide-react';

export function Vectors2D() {
  const [vectorA, setVectorA] = useState({ x: 3, y: 2 });
  const [vectorB, setVectorB] = useState({ x: 1, y: 3 });
  const [scalar, setScalar] = useState(1);
  const [showSum, setShowSum] = useState(true);
  const [showDiff, setShowDiff] = useState(false);
  const [showScalar, setShowScalar] = useState(false);

  // ベクトルの計算
  const vectorSum = { x: vectorA.x + vectorB.x, y: vectorA.y + vectorB.y };
  const vectorDiff = { x: vectorA.x - vectorB.x, y: vectorA.y - vectorB.y };
  const scalarProduct = { x: scalar * vectorA.x, y: scalar * vectorA.y };
  const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;
  const magnitudeA = Math.sqrt(vectorA.x ** 2 + vectorA.y ** 2);
  const magnitudeB = Math.sqrt(vectorB.x ** 2 + vectorB.y ** 2);
  const angle = Math.acos(dotProduct / (magnitudeA * magnitudeB)) * (180 / Math.PI);

  // グラフデータの生成
  const generateVectorData = () => {
    const data = [
      // ベクトルA
      {
        x: [0, vectorA.x],
        y: [0, vectorA.y],
        name: `ベクトル a = (${vectorA.x}, ${vectorA.y})`,
        color: '#3b82f6',
        type: '2d' as const,
      },
      // ベクトルB
      {
        x: [0, vectorB.x],
        y: [0, vectorB.y],
        name: `ベクトル b = (${vectorB.x}, ${vectorB.y})`,
        color: '#ef4444',
        type: '2d' as const,
      },
    ];

    // 和ベクトル
    if (showSum) {
      data.push({
        x: [0, vectorSum.x],
        y: [0, vectorSum.y],
        name: `a + b = (${vectorSum.x}, ${vectorSum.y})`,
        color: '#10b981',
        type: '2d' as const,
      });
      // 平行四辺形
      data.push({
        x: [vectorA.x, vectorSum.x, vectorB.x],
        y: [vectorA.y, vectorSum.y, vectorB.y],
        name: '平行四辺形',
        color: '#10b981',
        type: '2d' as const,
      });
    }

    // 差ベクトル
    if (showDiff) {
      data.push({
        x: [0, vectorDiff.x],
        y: [0, vectorDiff.y],
        name: `a - b = (${vectorDiff.x}, ${vectorDiff.y})`,
        color: '#f59e0b',
        type: '2d' as const,
      });
    }

    // スカラー倍
    if (showScalar) {
      data.push({
        x: [0, scalarProduct.x],
        y: [0, scalarProduct.y],
        name: `${scalar}a = (${scalarProduct.x.toFixed(1)}, ${scalarProduct.y.toFixed(1)})`,
        color: '#8b5cf6',
        type: '2d' as const,
      });
    }

    return data;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">平面ベクトル</h1>
        <p className="text-lg text-gray-600">
          ベクトルの加法、スカラー倍、内積を視覚的に理解します
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* グラフ表示エリア */}
        <div>
          <Graph2D
            data={generateVectorData()}
            title="ベクトルの演算"
            xLabel="x"
            yLabel="y"
            width={500}
            height={500}
          />
        </div>

        {/* コントロールパネル */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">ベクトルの設定</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="font-medium text-blue-700 mb-2">ベクトル a</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      x = {vectorA.x}
                    </label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.5"
                      value={vectorA.x}
                      onChange={(e) => setVectorA({ ...vectorA, x: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      y = {vectorA.y}
                    </label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.5"
                      value={vectorA.y}
                      onChange={(e) => setVectorA({ ...vectorA, y: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-medium text-red-700 mb-2">ベクトル b</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      x = {vectorB.x}
                    </label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.5"
                      value={vectorB.x}
                      onChange={(e) => setVectorB({ ...vectorB, x: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      y = {vectorB.y}
                    </label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.5"
                      value={vectorB.y}
                      onChange={(e) => setVectorB({ ...vectorB, y: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  スカラー k = {scalar}
                </label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={scalar}
                  onChange={(e) => setScalar(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showSum}
                  onChange={(e) => setShowSum(e.target.checked)}
                  className="rounded text-green-600"
                />
                <span className="text-sm">和 a + b を表示</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showDiff}
                  onChange={(e) => setShowDiff(e.target.checked)}
                  className="rounded text-yellow-600"
                />
                <span className="text-sm">差 a - b を表示</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showScalar}
                  onChange={(e) => setShowScalar(e.target.checked)}
                  className="rounded text-purple-600"
                />
                <span className="text-sm">スカラー倍 ka を表示</span>
              </label>
            </div>
          </div>

          {/* 計算結果 */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">計算結果</h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <strong>内積 a・b:</strong>{' '}
                <span className="font-mono">
                  {vectorA.x} × {vectorB.x} + {vectorA.y} × {vectorB.y} = {dotProduct.toFixed(2)}
                </span>
              </div>
              <div>
                <strong>|a|:</strong>{' '}
                <span className="font-mono">{magnitudeA.toFixed(2)}</span>
              </div>
              <div>
                <strong>|b|:</strong>{' '}
                <span className="font-mono">{magnitudeB.toFixed(2)}</span>
              </div>
              <div>
                <strong>なす角:</strong>{' '}
                <span className="font-mono">{angle.toFixed(1)}°</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 理論説明 */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold">平面ベクトルの基本演算</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">ベクトルの演算</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>加法:</strong> a + b = (a₁ + b₁, a₂ + b₂)
              </li>
              <li>
                <strong>減法:</strong> a - b = (a₁ - b₁, a₂ - b₂)
              </li>
              <li>
                <strong>スカラー倍:</strong> ka = (ka₁, ka₂)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">内積と応用</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>内積:</strong> a・b = a₁b₁ + a₂b₂ = |a||b|cos θ
              </li>
              <li>
                <strong>大きさ:</strong> |a| = √(a₁² + a₂²)
              </li>
              <li>
                <strong>なす角:</strong> cos θ = (a・b)/(|a||b|)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>💡 ヒント:</strong> 平行四辺形の法則により、
            ベクトルの和は平行四辺形の対角線として表現できます。
            内積が0のとき、2つのベクトルは直交しています。
          </p>
        </div>
      </div>
    </div>
  );
}