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
    const data = Object.keys(this.props.symptoms).map((key) => {
      return {
        Symptom: key,
        Count: this.props.symptoms[key],
      };
    });

    return (
      <div style={{ overflow: "scroll" }}>
        <BarChart
          width={450}
          height={250}
          data={data}
          margin={{ top: 50, right: 0, left: -20, bottom: 0 }}
        >
          <XAxis dataKey="Symptom" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Count" fill="#ffb347" />
        </BarChart>
      </div>
    );
  }
}
