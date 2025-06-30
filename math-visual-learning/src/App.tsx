import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TopicsPage } from './pages/TopicsPage';
import { QuadraticFunctions } from './pages/topics/QuadraticFunctions';
import { TrigonometryBasics } from './pages/topics/TrigonometryBasics';
import { Vectors2D } from './pages/topics/Vectors2D';
import { Derivatives } from './pages/topics/Derivatives';
import { LinearAlgebraBasics } from './pages/topics/LinearAlgebraBasics';
import { MultivariableCalculus } from './pages/topics/MultivariableCalculus';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/quadratic-functions" element={<QuadraticFunctions />} />
          <Route path="/topics/trigonometry-basics" element={<TrigonometryBasics />} />
          <Route path="/topics/vectors-2d" element={<Vectors2D />} />
          <Route path="/topics/derivatives" element={<Derivatives />} />
          <Route path="/topics/linear-algebra-basics" element={<LinearAlgebraBasics />} />
          <Route path="/topics/multivariable-calculus" element={<MultivariableCalculus />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
