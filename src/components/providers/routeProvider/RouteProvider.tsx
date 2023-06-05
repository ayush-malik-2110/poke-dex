import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '../../../components/route/home/HomePage';

export enum PageRoutes {
  ROOT = '/',
}

export const RouteProvider = (): JSX.Element | null => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PageRoutes.ROOT} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};