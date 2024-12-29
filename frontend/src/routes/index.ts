import { lazy } from 'react';

const BondTrading = lazy(() => import('../pages/Dashboard/ECommerce'));
const Portfolio = lazy(() => import('../pages/Portfolio/Portfolio'));
const BuyBonds = lazy(() => import('../pages/Bonds/BuyBonds'));
const RiskManagement = lazy(() => import('../pages/RiskManagement/RiskManagement'));
const News = lazy(() => import('../pages/News/News'));
const Notifications = lazy(() => import('../pages/Notifications/Notifications'));

const coreRoutes = [
  {
    path: '/dashboard',
    title: 'Bond Trading',
    component: BondTrading,
  },
  {
    path: '/portfolio',
    title: 'Portfolio',
    component: Portfolio,
  },
  {
    path: '/buy-bonds',
    title: 'Buy Bonds',
    component: BuyBonds,
  },
  {
    path: '/risk-management',
    title: 'Risk Management',
    component: RiskManagement,
  },
  {
    path: '/news',
    title: 'Market News',
    component: News,
  },
  {
    path: '/notifications',
    title: 'Notifications',
    component: Notifications,
  },
];

const routes = [...coreRoutes];
export default routes;
