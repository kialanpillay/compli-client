import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#17c671"];

export default class OccupancyChart extends PureComponent {
  render() {
    const data = [
      { name: "Occupancy", value: this.props.data.occupancy },
      { name: "Available", value: 50 - this.props.data.occupancy },
    ];
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={200} height={80}>
        <Pie
          data={data}
          cx={100}
          cy={80}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      </ResponsiveContainer>
      
    );
  }
}
