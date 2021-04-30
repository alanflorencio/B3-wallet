import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';

import { ValueScale } from '@devexpress/dx-react-chart';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { month: 'Jan', sale: 50, total: 987 },
        { month: 'Feb', sale: 100, total: 3000 },
        { month: 'March', sale: 30, total: 1100 },
        { month: 'April', sale: 107, total: 7100 },
        { month: 'May', sale: 95, total: 4300 },
        { month: 'June', sale: 150, total: 7500 },
      ],
    };
  }

  render() {
    
    const { data: chartData } = this.state;

    return (
        <Chart
          data={chartData}
        >
          <ValueScale name="sale" />

          <ArgumentAxis />
          <ValueAxis scaleName="sale" showGrid={false} showLine showTicks />

          <BarSeries
            name="Units Sold"
            valueField="sale"
            argumentField="month"
            scaleName="sale"
          />
          <Legend />
        </Chart>
      );
  }
}
