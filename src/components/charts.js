import React from "react";
import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';
import { Divider } from "antd";
class Clock extends React.Component {
  render() {

    const data = [
      { month: 'Jan.', count: 69, city: 'tokyo' },
      { month: 'Feb.', count: 29, city: 'tokyo' },
      { month: 'Mar.', count: 49, city: 'tokyo' },
      { month: 'Apr.', count: 39, city: 'tokyo' },
      { month: 'May.', count: 89, city: 'tokyo' },
      { month: 'Jun.', count: 69, city: 'tokyo' },
      { month: 'Jul.', count: 59, city: 'tokyo' },
      { month: 'Aug.', count: 79, city: 'tokyo' },
      { month: 'Sep.', count: 69, city: 'tokyo' },
      { month: 'Oct.', count: 39, city: 'tokyo' },
      { month: 'Nov.', count: 19, city: 'tokyo' },
      { month: 'Dec.', count: 49, city: 'tokyo' },
    ];
    const scale = {
      month: { alias: 'Month', },
      count: { alias: 'Requests', },
    };
    return (
      <React.Fragment>
        <Divider />
        <Chart height={400} data={data} scale={scale} forceFit>
          <Axis title name="month" />
          <Axis title name="count" />
          <Legend />
          <Tooltip crosshairs={{ type: 'rect' }} />
          <Geom type="interval" position="month*count" color="month" />
        </Chart>
      </React.Fragment>
    )
  }
}
export default Clock;
