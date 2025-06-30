import type { Topic } from '../types';

export const topics: Topic[] = [
  // 高校基礎
  {
    id: 'quadratic-functions',
    title: '二次関数',
    description: '放物線の性質を視覚的に理解し、頂点、軸、判別式について学びます',
    level: 'highschool-basic',
    category: 'algebra',
    interactive: true,
    route: '/topics/quadratic-functions'
  },
  {
    id: 'trigonometry-basics',
    title: '三角関数の基礎',
    description: '単位円を使って sin, cos, tan の関係を視覚的に理解します',
    level: 'highschool-basic',
    category: 'trigonometry',
    interactive: true,
    route: '/topics/trigonometry-basics'
  },
  {
    id: 'vectors-2d',
    title: '平面ベクトル',
    description: 'ベクトルの加法、スカラー倍、内積を視覚的に理解します',
    level: 'highschool-basic',
    category: 'geometry',
    interactive: true,
    route: '/topics/vectors-2d'
  },
  {
    id: 'sequences',
    title: '数列',
    description: '等差数列・等比数列の性質をグラフで視覚化します',
    level: 'highschool-basic',
    category: 'algebra',
    interactive: true,
    route: '/topics/sequences'
  },

  // 高校発展
  {
    id: 'derivatives',
    title: '微分',
    description: '接線の概念から導関数まで、変化率を視覚的に理解します',
    level: 'highschool-advanced',
    category: 'calculus',
    prerequisites: ['quadratic-functions'],
    interactive: true,
    route: '/topics/derivatives'
  },
  {
    id: 'integrals',
    title: '積分',
    description: '面積の概念から定積分まで、累積を視覚的に理解します',
    level: 'highschool-advanced',
    category: 'calculus',
    prerequisites: ['derivatives'],
    interactive: true,
    route: '/topics/integrals'
  },
  {
    id: 'complex-numbers',
    title: '複素数',
    description: '複素平面上での複素数の表現と演算を視覚化します',
    level: 'highschool-advanced',
    category: 'algebra',
    interactive: true,
    route: '/topics/complex-numbers'
  },
  {
    id: 'conic-sections',
    title: '円錐曲線',
    description: '楕円、双曲線、放物線を3D空間で視覚的に理解します',
    level: 'highschool-advanced',
    category: 'geometry',
    interactive: true,
    route: '/topics/conic-sections'
  },

  // 大学基礎
  {
    id: 'linear-algebra-basics',
    title: '線形代数の基礎',
    description: '行列の演算、固有値、固有ベクトルを視覚的に理解します',
    level: 'university-basic',
    category: 'linear-algebra',
    interactive: true,
    route: '/topics/linear-algebra-basics'
  },
  {
    id: 'multivariable-calculus',
    title: '多変数微積分',
    description: '偏微分、勾配、等高線を3Dで視覚化します',
    level: 'university-basic',
    category: 'calculus',
    prerequisites: ['derivatives', 'integrals'],
    interactive: true,
    route: '/topics/multivariable-calculus'
  },
  {
    id: 'probability-distributions',
    title: '確率分布',
    description: '正規分布、ポアソン分布などを視覚的に理解します',
    level: 'university-basic',
    category: 'statistics',
    interactive: true,
    route: '/topics/probability-distributions'
  },
  {
    id: 'fourier-series',
    title: 'フーリエ級数',
    description: '周期関数の分解と合成をアニメーションで理解します',
    level: 'university-basic',
    category: 'calculus',
    interactive: true,
    route: '/topics/fourier-series'
  },

  // 大学発展
  {
    id: 'complex-analysis',
    title: '複素解析',
    description: '複素関数の微分、積分、留数定理を視覚化します',
    level: 'university-advanced',
    category: 'complex-analysis',
    prerequisites: ['complex-numbers', 'multivariable-calculus'],
    interactive: true,
    route: '/topics/complex-analysis'
  },
  {
    id: 'differential-equations',
    title: '微分方程式',
    description: '解曲線、位相平面、安定性を視覚的に理解します',
    level: 'university-advanced',
    category: 'differential-equations',
    prerequisites: ['derivatives', 'linear-algebra-basics'],
    interactive: true,
    route: '/topics/differential-equations'
  },
  {
    id: 'topology',
    title: 'トポロジー',
    description: '連続変形、ホモトピー、基本群を視覚的に理解します',
    level: 'university-advanced',
    category: 'geometry',
    interactive: true,
    route: '/topics/topology'
  },
  {
    id: 'manifolds',
    title: '多様体',
    description: '曲面、接空間、微分形式を3D視覚化で理解します',
    level: 'university-advanced',
    category: 'geometry',
    prerequisites: ['multivariable-calculus', 'linear-algebra-basics'],
    interactive: true,
    route: '/topics/manifolds'
  }
];