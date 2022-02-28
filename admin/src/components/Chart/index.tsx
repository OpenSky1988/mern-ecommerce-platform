import { Line, LineConfig } from '@ant-design/plots';
import React from 'react';
import './style.less';

interface IChartProps {
  title: string;
  data: any;
}

const Chart: React.FC<IChartProps> = ({ title, data }) => {
  const config: LineConfig = {
    data,
    padding: 'auto',
    xField: 'name',
    yField: 'Active User',
    xAxis: {
      tickCount: 5,
    },
  };

  return (
    <div className="chart">
      <h3 className="chart__title">{title}</h3>
      <Line {...config} />
    </div>
  );
};

export default Chart;
