import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AnalyticsChart() {
  const data = [
    { day: "Mon", requests: 1200 },
    { day: "Tue", requests: 1800 },
    { day: "Wed", requests: 2400 },
    { day: "Thu", requests: 2100 },
    { day: "Fri", requests: 3200 },
    { day: "Sat", requests: 2700 },
    { day: "Sun", requests: 2900 },
  ];

  return (
    <div className="panel">
      <h2>API Usage Trends</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid stroke="#555555" strokeDasharray="3 3" />

          <XAxis
           dataKey="day"
          stroke= "#ffffff"
          tick={{ fill: "#ffffff"}}
           />

          <YAxis
          stroke="#ffffff"
          tick={{ fill: "#ffffff"}} />

          <Tooltip
  contentStyle={{
    background: "#18181b",
    border: "1px solid #525252",
    color: "#ffffff",
  }}
  labelStyle={{ color: "#ffffff" }}
/>

          <Line
            type="monotone"
            dataKey="requests"
            stroke="#ffffff"
            strokeWidth={3}
            dot={{ fill: "#ffffff", r:5}}
            activeDot={{r:7}}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;