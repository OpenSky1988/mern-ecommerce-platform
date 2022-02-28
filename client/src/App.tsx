import React from 'react';
import {
  Route,
  // RouteComponentProps,
  RouteProps,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import LoginLayout from './layouts/LoginLayout';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import OrderList from './pages/OrderList';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
// import RedirectToLoginScreen from './pages/RedirectToLoginScreen';
import Register from './pages/Register';
import { auth } from './store/apiActions/login';
import {
  useDispatch,
  // useSelector,
} from './store/hooks';
import eventEmitter from './utils/eventEmitter';

import 'antd/dist/antd.css';



const MainRoute = ({ component: Component, ...rest }: RouteProps) => (
  <Route {...rest} render={MainWrapper(Component)} />
);

const LoginRoute = ({ component: Component, ...rest }: RouteProps) => (
  <Route {...rest} render={LoginWrapper(Component)} />
);

const MainWrapper = (Component: React.ComponentType<any>) => (props: any) => (
  <ErrorBoundary>
    <MainLayout>
      <Component {...props} />
    </MainLayout>
  </ErrorBoundary>
);

const LoginWrapper = (Component: React.ComponentType<any>) => (props: any) => (
  <ErrorBoundary>
    <LoginLayout>
      <Component {...props} />
    </LoginLayout>
  </ErrorBoundary>
);

const App = () => {
  // type TWithAuth = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  // const isAuthorized = useSelector((state) => state.user.currentUser);
  // const withAuth = (Component: TWithAuth) => {
  //   if (!isAuthorized) {
  //     return RedirectToLoginScreen;
  //   }

  //   return Component;
  // };

  eventEmitter.on('logout', () => {
    auth.logout(dispatch);
    history.push(`/login?redirect=${location?.pathname}`);
  });

  return (
    <Switch>
      <LoginRoute path="/login" component={Login} />
      <LoginRoute path="/register" component={Register} />
      <MainRoute exact={true} path="/" component={Home} />
      <MainRoute path="/products" component={ProductList} />
      <MainRoute path="/product/:id" component={Product} />
      <MainRoute path="/orders" component={OrderList} />
      <MainRoute path="/order/:id" component={Order} />
      <MainRoute path="/cart" component={Cart} />
    </Switch>
  );
};

export default App;
