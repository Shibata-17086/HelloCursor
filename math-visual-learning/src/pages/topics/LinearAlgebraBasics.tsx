import { useState } from 'react';
import { Graph2D } from '../../components/Graph2D';
import { motion } from 'framer-motion';
import { Grid, ArrowRight, Rotate3D } from 'lucide-react';

export function LinearAlgebraBasics() {
  const [matrix, setMatrix] = useState({ a: 2, b: 1, c: 1, d: 2 });
  const [showEigenvectors, setShowEigenvectors] = useState(true);
  const [showTransformed, setShowTransformed] = useState(true);
  const [vectorCount, setVectorCount] = useState(8);

  // 固有値と固有ベクトルの計算
  const calculateEigen = () => {
    const { a, b, c, d } = matrix;
    const trace = a + d;
    const det = a * d - b * c;
    const discriminant = trace * trace - 4 * det;

    if (discriminant < 0) {
      return { eigenvalues: [], eigenvectors: [] };
    }

    const sqrtDisc = Math.sqrt(discriminant);
    const lambda1 = (trace + sqrtDisc) / 2;
    const lambda2 = (trace - sqrtDisc) / 2;

    const eigenvectors = [];
    
    // 固有ベクトルの計算
    if (Math.abs(lambda1 - a) > 0.001 || Math.abs(b) > 0.001) {
      const v1x = b !== 0 ? b : 1;
      const v1y = b !== 0 ? lambda1 - a : 0;
      const norm1 = Math.sqrt(v1x * v1x + v1y * v1y);
      eigenvectors.push({ x: v1x / norm1, y: v1y / norm1, lambda: lambda1 });
    }

    if (Math.abs(lambda2 - a) > 0.001 || Math.abs(b) > 0.001) {
      const v2x = b !== 0 ? b : 1;
      const v2y = b !== 0 ? lambda2 - a : 0;
      const norm2 = Math.sqrt(v2x * v2x + v2y * v2y);
      eigenvectors.push({ x: v2x / norm2, y: v2y / norm2, lambda: lambda2 });
    }

    return { eigenvalues: [lambda1, lambda2], eigenvectors };
  };

  const { eigenvalues, eigenvectors } = calculateEigen();

  // ベクトルの変換
  const transformVector = (x: number, y: number) => {
    return {
      x: matrix.a * x + matrix.b * y,
      y: matrix.c * x + matrix.d * y,
    };
  };

  // グラフデータの生成
  const generateVectorField = () => {
    const data = [];
    
    // 元のベクトル（単位円上）
    const originalVectors = [];
    for (let i = 0; i < vectorCount; i++) {
      const angle = (2 * Math.PI * i) / vectorCount;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      originalVectors.push({ x, y });
      
      data.push({
        x: [0, x],
        y: [0, y],
        name: '元のベクトル',
        color: '#94a3b8',
        type: '2d' as const,
      });
    }

    // 変換後のベクトル
    if (showTransformed) {
      originalVectors.forEach((v, i) => {
        const transformed = transformVector(v.x, v.y);
        data.push({
          x: [0, transformed.x],
          y: [0, transformed.y],
          name: '変換後',
          color: '#3b82f6',
          type: '2d' as const,
        });
      });
    }

    // 固有ベクトル
    if (showEigenvectors && eigenvectors.length > 0) {
      eigenvectors.forEach((ev, i) => {
        const scale = 2;
        data.push({
          x: [-scale * ev.x, scale * ev.x],
          y: [-scale * ev.y, scale * ev.y],
          name: `固有ベクトル (λ=${ev.lambda.toFixed(2)})`,
          color: i === 0 ? '#ef4444' : '#10b981',
          type: '2d' as const,
        });
      });
    }

    return data;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">線形代数の基礎</h1>
        <p className="text-lg text-gray-600">
          行列の演算、固有値、固有ベクトルを視覚的に理解します
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* グラフ表示エリア */}
        <div>
          <Graph2D
            data={generateVectorField()}
            title="行列による変換"
            xLabel="x"
            yLabel="y"
            width={500}
            height={500}
          />
        </div>

        {/* コントロールパネル */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Grid className="w-5 h-5" />
              変換行列 A
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded p-4">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={matrix.a}
                    onChange={(e) => setMatrix({ ...matrix, a: parseFloat(e.target.value) || 0 })}
                    className="w-full px-2 py-1 border rounded text-center"
                    step="0.1"
                  />
                  <input
                    type="number"
                    value={matrix.b}
                    onChange={(e) => setMatrix({ ...matrix, b: parseFloat(e.target.value) || 0 })}
                    className="w-full px-2 py-1 border rounded text-center"
                    step="0.1"
                  />
                  <input
                    type="number"
                    value={matrix.c}
                    onChange={(e) => setMatrix({ ...matrix, c: parseFloat(e.target.value) || 0 })}
                    className="w-full px-2 py-1 border rounded text-center"
                    step="0.1"
                  />
                  <input
                    type="number"
                    value={matrix.d}
                    onChange={(e) => setMatrix({ ...matrix, d: parseFloat(e.target.value) || 0 })}
                    className="w-full px-2 py-1 border rounded text-center"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setMatrix({ a: 1, b: 0, c: 0, d: 1 })}
                  className="w-full px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  単位行列
                </button>
                <button
                  onClick={() => setMatrix({ a: 0, b: -1, c: 1, d: 0 })}
                  className="w-full px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  90°回転
                </button>
                <button
                  onClick={() => setMatrix({ a: 2, b: 0, c: 0, d: 0.5 })}
                  className="w-full px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  スケール変換
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showTransformed}
                  onChange={(e) => setShowTransformed(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span className="text-sm">変換後のベクトルを表示</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showEigenvectors}
                  onChange={(e) => setShowEigenvectors(e.target.checked)}
                  className="rounded text-red-600"
                />
                <span className="text-sm">固有ベクトルを表示</span>
              </label>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ベクトル数: {vectorCount}
              </label>
              <input
                type="range"
                min="4"
                max="16"
                value={vectorCount}
                onChange={(e) => setVectorCount(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* 固有値・固有ベクトル情報 */}
          <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Rotate3D className="w-5 h-5" />
              固有値と固有ベクトル
            </h3>
            
            <div className="space-y-3">
              {eigenvalues.length > 0 ? (
                <>
                  <div className="bg-white rounded p-3">
                    <p className="text-sm text-gray-600">固有値</p>
                    <p className="font-mono">
                      λ₁ = {eigenvalues[0]?.toFixed(3)}, λ₂ = {eigenvalues[1]?.toFixed(3)}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded p-3">
                    <p className="text-sm text-gray-600">行列式と跡</p>
                    <p className="font-mono">
                      det(A) = {(matrix.a * matrix.d - matrix.b * matrix.c).toFixed(3)}<br/>
                      tr(A) = {(matrix.a + matrix.d).toFixed(3)}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-600">実固有値が存在しません</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 理論説明 */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold">線形変換と固有値</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">線形変換</h3>
            <p className="text-sm text-gray-700 mb-2">
              2×2行列による変換：
            </p>
            <div className="bg-gray-50 p-3 rounded">
              <p className="font-mono text-sm">
                [x'] = [a b] [x]<br/>
                [y']   [c d] [y]
              </p>
            </div>
            <ul className="mt-3 text-sm space-y-1 text-gray-700">
              <li>• 原点を通る直線は直線に写る</li>
              <li>• 平行線は平行線に写る</li>
              <li>• 比は保存される</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">固有値・固有ベクトル</h3>
            <p className="text-sm text-gray-700 mb-2">
              Av = λv を満たすベクトル v と値 λ
            </p>
            <div className="bg-gray-50 p-3 rounded">
              <p className="font-mono text-sm">
                特性方程式：<br/>
                det(A - λI) = 0
              </p>
            </div>
            <ul className="mt-3 text-sm space-y-1 text-gray-700">
              <li>• 固有ベクトルは方向が変わらない</li>
              <li>• 固有値は拡大・縮小率を表す</li>
              <li>• 対角化の基礎となる</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}