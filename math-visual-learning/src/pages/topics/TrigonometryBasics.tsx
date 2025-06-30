import { useState, useEffect } from 'react';
import { Graph2D } from '../../components/Graph2D';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function TrigonometryBasics() {
  const [angle, setAngle] = useState(45);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSin, setShowSin] = useState(true);
  const [showCos, setShowCos] = useState(true);
  const [showTan, setShowTan] = useState(true);

  const radians = (angle * Math.PI) / 180;
  const sinValue = Math.sin(radians);
  const cosValue = Math.cos(radians);
  const tanValue = Math.tan(radians);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setAngle((prev) => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  // 単位円のデータ生成
  const generateUnitCircle = () => {
    const circleX = [];
    const circleY = [];
    for (let i = 0; i <= 360; i++) {
      const rad = (i * Math.PI) / 180;
      circleX.push(Math.cos(rad));
      circleY.push(Math.sin(rad));
    }

    const data = [
      {
        x: circleX,
        y: circleY,
        name: '単位円',
        color: '#6b7280',
        type: '2d' as const,
      },
      // 半径
      {
        x: [0, cosValue],
        y: [0, sinValue],
        name: '半径',
        color: '#3b82f6',
        type: '2d' as const,
      },
    ];

    // sin線
    if (showSin) {
      data.push({
        x: [cosValue, cosValue],
        y: [0, sinValue],
        name: `sin(${angle}°) = ${sinValue.toFixed(3)}`,
        color: '#ef4444',
        type: '2d' as const,
      });
    }

    // cos線
    if (showCos) {
      data.push({
        x: [0, cosValue],
        y: [0, 0],
        name: `cos(${angle}°) = ${cosValue.toFixed(3)}`,
        color: '#10b981',
        type: '2d' as const,
      });
    }

    // tan線
    if (showTan && Math.abs(cosValue) > 0.01) {
      const tanLineY = tanValue > 5 ? 5 : tanValue < -5 ? -5 : tanValue;
      data.push({
        x: [1, 1],
        y: [0, tanLineY],
        name: `tan(${angle}°) = ${tanValue.toFixed(3)}`,
        color: '#f59e0b',
        type: '2d' as const,
      });
    }

    return data;
  };

  // 三角関数のグラフデータ生成
  const generateTrigGraphs = () => {
    const x = [];
    const sinY = [];
    const cosY = [];
    const tanY = [];

    for (let i = 0; i <= 360; i += 2) {
      const rad = (i * Math.PI) / 180;
      x.push(i);
      sinY.push(Math.sin(rad));
      cosY.push(Math.cos(rad));
      const tanVal = Math.tan(rad);
      tanY.push(Math.abs(tanVal) > 5 ? NaN : tanVal);
    }

    const data = [];

    if (showSin) {
      data.push({
        x,
        y: sinY,
        name: 'sin(θ)',
        color: '#ef4444',
        type: '2d' as const,
      });
    }

    if (showCos) {
      data.push({
        x,
        y: cosY,
        name: 'cos(θ)',
        color: '#10b981',
        type: '2d' as const,
      });
    }

    if (showTan) {
      data.push({
        x,
        y: tanY,
        name: 'tan(θ)',
        color: '#f59e0b',
        type: '2d' as const,
      });
    }

    // 現在の角度を示す線
    data.push({
      x: [angle, angle],
      y: [-2, 2],
      name: `θ = ${angle}°`,
      color: '#6b7280',
      type: '2d' as const,
    });

    return data;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">三角関数の基礎</h1>
        <p className="text-lg text-gray-600">
          単位円を使って sin, cos, tan の関係を視覚的に理解します
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 単位円 */}
        <div>
          <Graph2D
            data={generateUnitCircle()}
            title="単位円"
            xLabel="x"
            yLabel="y"
            width={450}
            height={450}
          />
        </div>

        {/* 三角関数のグラフ */}
        <div>
          <Graph2D
            data={generateTrigGraphs()}
            title="三角関数のグラフ"
            xLabel="角度 (度)"
            yLabel="値"
            width={450}
            height={450}
          />
        </div>
      </div>

      {/* コントロールパネル */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">コントロール</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              角度 θ = {angle}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value))}
              className="w-full"
              disabled={isAnimating}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isAnimating ? '停止' : 'アニメーション'}
            </button>

            <button
              onClick={() => {
                setAngle(45);
                setIsAnimating(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              リセット
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showSin}
                onChange={(e) => setShowSin(e.target.checked)}
                className="rounded text-red-600"
              />
              <span className="text-sm">sin を表示</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showCos}
                onChange={(e) => setShowCos(e.target.checked)}
                className="rounded text-green-600"
              />
              <span className="text-sm">cos を表示</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showTan}
                onChange={(e) => setShowTan(e.target.checked)}
                className="rounded text-yellow-600"
              />
              <span className="text-sm">tan を表示</span>
            </label>
          </div>
        </div>
      </div>

      {/* 値の表示 */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-semibold text-red-700">sin({angle}°)</h4>
          <p className="text-2xl font-mono">{sinValue.toFixed(4)}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-700">cos({angle}°)</h4>
          <p className="text-2xl font-mono">{cosValue.toFixed(4)}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-700">tan({angle}°)</h4>
          <p className="text-2xl font-mono">
            {Math.abs(tanValue) > 100 ? '±∞' : tanValue.toFixed(4)}
          </p>
        </div>
      </div>

      {/* 理論説明 */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold">三角関数の定義</h2>
        
        <div className="prose max-w-none text-gray-700">
          <p>
            三角関数は、直角三角形の辺の比から定義され、周期的な現象を記述する際に重要な役割を果たします。
          </p>

          <h3 className="text-xl font-semibold mt-4">単位円による定義</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong className="text-red-600">sin θ</strong>: 
              単位円上の点のy座標
            </li>
            <li>
              <strong className="text-green-600">cos θ</strong>: 
              単位円上の点のx座標
            </li>
            <li>
              <strong className="text-yellow-600">tan θ</strong>: 
              sin θ / cos θ （cos θ ≠ 0のとき）
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">重要な性質</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>周期性: sin, cosは360°(2π)の周期、tanは180°(π)の周期</li>
            <li>対称性: sin(-θ) = -sin(θ)、cos(-θ) = cos(θ)</li>
            <li>基本恒等式: sin²θ + cos²θ = 1</li>
          </ul>
        </div>
      </div>
    </div>
  );
}