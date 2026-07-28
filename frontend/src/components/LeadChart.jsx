import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function LeadChart({ leads }) {
  const data = leads.map((lead) => ({
    name: lead.company_name.length > 10
      ? lead.company_name.substring(0, 10) + "..."
      : lead.company_name,
    score: lead.lead_score || 0,
  }));

  return (
    <section className="lead-card">
      <h2>Lead Score Analytics</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default LeadChart;