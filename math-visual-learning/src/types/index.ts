// 数学のレベル
export type MathLevel = 'highschool-basic' | 'highschool-advanced' | 'university-basic' | 'university-advanced';

// 数学のカテゴリ
export type MathCategory = 
  | 'algebra' 
  | 'geometry' 
  | 'trigonometry' 
  | 'calculus' 
  | 'linear-algebra' 
  | 'statistics'
  | 'complex-analysis'
  | 'differential-equations';

// トピックの構造
export interface Topic {
  id: string;
  title: string;
  description: string;
  level: MathLevel;
  category: MathCategory;
  prerequisites?: string[];
  interactive: boolean;
  route: string;
}

// グラフのプロットデータ
export interface PlotData {
  x: number[];
  y: number[];
  z?: number[];
  type: '2d' | '3d';
  name?: string;
  color?: string;
}

// 数学の概念
export interface Concept {
  id: string;
  title: string;
  theory: string;
  formula?: string;
  examples: Example[];
  visualizations: Visualization[];
}

// 例
export interface Example {
  id: string;
  title: string;
  problem: string;
  solution: string;
  steps?: string[];
}

// 視覚化
export interface Visualization {
  id: string;
  type: 'graph2d' | 'graph3d' | 'animation' | 'geometric';
  title: string;
  description: string;
  interactive: boolean;
}