import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Route, RouteComponentProps,
  RouteProps, Switch,
  useHistory,
  useLocation
} from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import OrderList from './pages/OrderList';
import ProductList from './pages/ProductList';
import RedirectHome from './pages/RedirectHome';
import RedirectToLoginScreen from './pages/ReidrectToLoginScreen';
import UserList from './pages/UserList';
import { auth } from './store/apiActions/login';
import { useSelector } from './store/hooks';
import eventEmitter from './utils/eventEmitter';

import 'antd/dist/antd.css';
import './style.less';

const AuthRoute = ({ component: Component, ...rest }: RouteProps) => (
  <Route {...rest} render={AuthWrapper(Component)} />
);

const MainRoute = ({ component: Component, ...rest }: RouteProps) => (
  <Route {...rest} render={MainWrapper(Component)} />
);

const AuthWrapper = (Component: React.ComponentType<any>) => (props: any) => (
  <ErrorBoundary>
    <AuthLayout>
      <Component {...props} />
    </AuthLayout>
  </ErrorBoundary>
);

const MainWrapper = (Component: React.ComponentType<any>) => (props: any) => (
  <ErrorBoundary>
    <MainLayout>
      <Component {...props} />
    </MainLayout>
  </ErrorBoundary>
);

const App: React.FC = () => {
  type TWithAuth = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const isAuthorizedAsAdmin = useSelector((state) => state.user?.currentUser?.isAdmin);
  const withAuth = (Component: TWithAuth) => {
    if (!isAuthorizedAsAdmin) {
      return RedirectToLoginScreen;
    }

    return Component;
  };

  eventEmitter.on('logout', () => {
    auth.logout(dispatch);
    history.push(`/login?redirect=${location?.pathname}`);
  });

  return (
    <Switch>
      <AuthRoute path="/login" exact={true} component={Login} />
      <MainRoute path="/" exact={true} component={RedirectHome} />
      <MainRoute path="/dashboard/home" exact={true} component={withAuth(Home)} />
      <MainRoute path="/categories/users" exact={true} component={withAuth(UserList)} />
      <MainRoute path="/categories/orders" exact={true} component={withAuth(OrderList)} />
      <MainRoute path="/categories/products" exact={true} component={withAuth(ProductList)} />
    </Switch>
  );
}

export default App;
