import {
  FaUsers,
  FaChartLine,
  FaFire,
  FaBuilding,
} from "react-icons/fa";

function StatsCards({ stats }) {

  const cards = [
    {
      title: "Total Leads",
      value: stats.total,
      icon: <FaUsers />,
    },
    {
      title: "Average Score",
      value: stats.average,
      icon: <FaChartLine />,
    },
    {
      title: "High Score",
      value: stats.highScore,
      icon: <FaFire />,
    },
    {
      title: "Industries",
      value: stats.industries,
      icon: <FaBuilding />,
    },
  ];

  return (
    <section className="stats">

      {cards.map((card) => (

        <div className="stat-card" key={card.title}>

          <div className="stat-icon">
            {card.icon}
          </div>

          <h3>{card.title}</h3>

          <h1>{card.value}</h1>

        </div>

      ))}

    </section>
  );
}

export default StatsCards;