import type { FC } from 'react';
import MainPage from './pages/MainPage/MainPage';

type AppProps = {
  offerCount: number;
};

const App: FC<AppProps> = ({ offerCount }) => (
  <div className="app">
    <MainPage offerCount={offerCount} />;
  </div>
);

export default App;
