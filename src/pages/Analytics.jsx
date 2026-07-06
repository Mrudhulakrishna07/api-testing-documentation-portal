import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Analytics({ apiCollections }) {

  const data = apiCollections.map((api) => ({
    name: api.name,
    requests: api.endpoints.length * 50,
  }));
  const totalEndpoints = apiCollections.reduce(
  (sum, api) => sum + api.endpoints.length,
  0
);

const totalRequests = totalEndpoints * 50;

const activeApis = apiCollections.filter(
  (api) => api.status === "Active"
).length;
  const avgSuccessRate =
  totalEndpoints === 0 ? 0 : 95 + Math.min(totalEndpoints, 5);

const avgResponseTime =
  totalEndpoints === 0 ? 0 : Math.max(120, 300 - totalEndpoints * 10);



  return (
    <div>
      
      <div className="hero-section">
        <h1>API Analytics</h1>

        <p>
          Monitor API performance,
          usage metrics and service insights.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>
            {totalRequests}
          </h2>
          <p>Total Requests</p>
        </div>

        <div className="stat-card">
          <h2>{avgSuccessRate}%</h2>
          <p>Success Rate</p>
        </div>

        <div className="stat-card">
          <h2>{avgResponseTime}ms</h2>
          <p>Avg Response Time</p>
        </div>

        <div className="stat-card">
          <h2>{activeApis}</h2>
          <p>Active APIs</p>
        </div>
      </div>

      <div className="panel">
        <h2>API Usage Analytics</h2>

        <ResponsiveContainer width="100%" height={350}>
  <LineChart data={data}>

    <CartesianGrid
      stroke="#555555"
      strokeDasharray="3 3"
    />

    <XAxis
      dataKey="name"
      tick={{ fill: "#ffffff" }}
      axisLine={{ stroke: "#ffffff" }}
      tickLine={{ stroke: "#ffffff" }}
    />

    <YAxis
      tick={{ fill: "#ffffff" }}
      axisLine={{ stroke: "#ffffff" }}
      tickLine={{ stroke: "#ffffff" }}
    />

    <Tooltip
      contentStyle={{
        background: "#1f1f1f",
        border: "1px solid #444",
        borderRadius:"10px",
        color: "#fff",
      }}
      labelStyle={{ color: "#fff",
        fontWeight:"600",
       }}
       itemStyle={{
        color:"#111111",
        fontWeight:500,
       }}
    />

    <Line
      type="monotone"
      dataKey="requests"
      stroke="#ffffff"
      strokeWidth={3}
      dot={{
        fill: "#ffffff",
        stroke: "#ffffff",
        strokeWidth: 2,
        r: 5,
      }}
      activeDot={{
        r: 7,
        fill: "#ffffff",
      }}
    />

  </LineChart>
</ResponsiveContainer>
      </div>

      <div style={{ height: "20px" }}></div>

      <div className="dashboard-grid">
        <div className="panel">
          <h2>API Categories</h2>

          <ul>
            <li>Authentication</li>
            <li>Payments</li>
            <li>Users</li>
            <li>Notifications</li>
            <li>Analytics</li>
          </ul>
        </div>

        <div className="panel">
          <h2>API Groups</h2>

          <ul>
            <li>User Services</li>
            <li>Payment Services</li>
            <li>Admin Services</li>
            <li>Reporting Services</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Analytics;