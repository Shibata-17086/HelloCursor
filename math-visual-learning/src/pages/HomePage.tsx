import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Users, Zap } from 'lucide-react';

export function HomePage() {
  const features = [
    {
      icon: Sparkles,
      title: 'インタラクティブな視覚化',
      description: 'グラフや3D図形をマウスで操作しながら、数学の概念を直感的に理解できます。',
    },
    {
      icon: Target,
      title: '段階的な学習',
      description: '高校基礎から大学発展まで、レベルに応じて段階的に学習を進められます。',
    },
    {
      icon: Users,
      title: '豊富な例題',
      description: '各トピックには具体的な例題と詳しい解説が用意されています。',
    },
    {
      icon: Zap,
      title: 'リアルタイム計算',
      description: 'パラメータを変更すると、グラフや図形がリアルタイムで更新されます。',
    },
  ];

  return (
    <div className="space-y-16">
      {/* ヒーローセクション */}
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          数学を視覚的に学ぼう
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-gray-700 max-w-2xl mx-auto"
        >
          高校基礎から大学発展までの数学を、グラフや立体図を使って直感的に理解。
          インタラクティブな視覚化で、数学の美しさと楽しさを発見しよう。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4"
        >
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            学習を始める
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* 特徴セクション */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          );
        })}
      </section>

      {/* サンプルトピックス */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">人気のトピック</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/topics/quadratic-functions"
            className="group bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="text-blue-600 font-semibold mb-2">高校基礎</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              二次関数
            </h3>
            <p className="text-gray-600">
              放物線の性質を視覚的に理解し、頂点や軸について学びます。
            </p>
          </Link>

          <Link
            to="/topics/derivatives"
            className="group bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="text-purple-600 font-semibold mb-2">高校発展</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
              微分
            </h3>
            <p className="text-gray-600">
              接線の概念から導関数まで、変化率を視覚的に理解します。
            </p>
          </Link>

          <Link
            to="/topics/multivariable-calculus"
            className="group bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="text-green-600 font-semibold mb-2">大学基礎</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">
              多変数微積分
            </h3>
            <p className="text-gray-600">
              偏微分、勾配、等高線を3Dで視覚化します。
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}