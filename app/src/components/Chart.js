import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default class Chart extends PureComponent {
  render() {
    let data = [];
    for (let key in this.props.symptoms) {
      let obj = {
        name: key,
        count: this.props.symptoms[key],
      };
      data.push(obj);
    }

    return (
      <BarChart width={500} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="orange" />
      </BarChart>
    );
  }
}
