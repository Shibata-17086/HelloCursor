import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { topics } from '../data/topics';
import type { MathLevel, MathCategory } from '../types';

export function TopicsPage() {
  const [selectedLevel, setSelectedLevel] = useState<MathLevel | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<MathCategory | 'all'>('all');

  const levels: { value: MathLevel | 'all'; label: string; color: string }[] = [
    { value: 'all', label: 'すべて', color: 'gray' },
    { value: 'highschool-basic', label: '高校基礎', color: 'blue' },
    { value: 'highschool-advanced', label: '高校発展', color: 'purple' },
    { value: 'university-basic', label: '大学基礎', color: 'green' },
    { value: 'university-advanced', label: '大学発展', color: 'red' },
  ];

  const categories: { value: MathCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'すべて' },
    { value: 'algebra', label: '代数' },
    { value: 'geometry', label: '幾何' },
    { value: 'trigonometry', label: '三角関数' },
    { value: 'calculus', label: '微積分' },
    { value: 'linear-algebra', label: '線形代数' },
    { value: 'statistics', label: '統計' },
    { value: 'complex-analysis', label: '複素解析' },
    { value: 'differential-equations', label: '微分方程式' },
  ];

  const filteredTopics = topics.filter((topic) => {
    const levelMatch = selectedLevel === 'all' || topic.level === selectedLevel;
    const categoryMatch = selectedCategory === 'all' || topic.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  const getLevelColor = (level: MathLevel) => {
    const levelObj = levels.find((l) => l.value === level);
    return levelObj?.color || 'gray';
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">トピック一覧</h1>
        <p className="text-lg text-gray-600">
          高校基礎から大学発展まで、段階的に数学を学習できます
        </p>
      </div>

      {/* フィルター */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold">フィルター</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              レベル
            </label>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSelectedLevel(level.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedLevel === level.value
                      ? `bg-${level.color}-100 text-${level.color}-700 border-${level.color}-200 border`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カテゴリ
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-blue-100 text-blue-700 border-blue-200 border'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* トピックリスト */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Link
              to={topic.route}
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 h-full"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full bg-${getLevelColor(
                      topic.level
                    )}-100 text-${getLevelColor(topic.level)}-700`}
                  >
                    {levels.find((l) => l.value === topic.level)?.label}
                  </span>
                  <span className="text-sm text-gray-500">
                    {categories.find((c) => c.value === topic.category)?.label}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {topic.title}
                </h3>
                
                <p className="text-gray-600 flex-grow">{topic.description}</p>

                {topic.prerequisites && topic.prerequisites.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      前提知識: {topic.prerequisites.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">該当するトピックが見つかりませんでした</p>
        </div>
      )}
    </div>
  );
}