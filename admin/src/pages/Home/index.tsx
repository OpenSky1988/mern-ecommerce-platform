import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import Chart from 'src/components/Chart';
import FeaturedInfo from 'src/components/FeaturedInfo';
import LatestTransactions from 'src/components/LatestTransactions';
import NewUsers from 'src/components/NewUsers';
import { authorizedRequest } from 'src/requestMethods';

import './style.less';

interface IIncomeItem {
  total: number;
  _id: number;
}

const Home: React.FC = () => {
  const [userStats, setUserStats] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const MONTHS = useMemo(() => [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec',
  ], []);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await authorizedRequest.get('/users/stats');
        const newStats = res.data.reduce((acc: IIncomeItem[], item: IIncomeItem) => ([
          ...acc,
          {
            name: MONTHS[item._id - 1],
            'Active User': item.total,
          },
        ]), []);

        setUserStats(newStats);
      } catch (err) {
        console.error(err);
      }
    };
    getStats();
  }, [MONTHS]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await authorizedRequest.get('users/?new=true');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    const getOrders = async () => {
      try {
        const res = await authorizedRequest.get('orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();
    getOrders();
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="Активные пользователи"
      />
      <div className="home__widgets">
        <NewUsers users={users} />
        <LatestTransactions orders={orders} />
      </div>
    </div>
  );
};

export default Home;
