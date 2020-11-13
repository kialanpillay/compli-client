import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default class Chart extends PureComponent {
  render() {
    let data = [];
    for (let key in this.props.symptoms) {
      let obj = {
        Symptom: key,
        Count: this.props.symptoms[key],
      };
      data.push(obj);
    }

    return (
      <BarChart width={500} height={250} data={data}>
        <XAxis dataKey="Symptom" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Count" fill="orange" />
      </BarChart>
    );
  }
}
