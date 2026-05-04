import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ data = {} }) {
  const consumed = Number(data.consumed) || 0;
  const wasted = Number(data.wasted) || 0;
  const shared = Number(data.shared) || 0;

  const chartData = {
    labels: ["Consumed", "Wasted", "Shared"],
    datasets: [
      {
        data: [consumed, wasted, shared],
        backgroundColor: [
          "#2e7d32", // dark green
          "#66bb6a", // light green
          "#a5d6a7", // pale green
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
}

export default PieChart;