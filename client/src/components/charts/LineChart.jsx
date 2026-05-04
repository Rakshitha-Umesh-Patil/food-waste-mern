import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function LineChart({ data = [] }) {
  const safeData =
    data.length === 7 ? data : [0, 0, 0, 0, 0, 0, 0];

  const chartData = {
    labels: [
      "Day 1", "Day 2", "Day 3",
      "Day 4", "Day 5", "Day 6", "Day 7"
    ],
    datasets: [
      {
        label: "Daily Food Waste (kg)",
        data: safeData,
        borderColor: "#2e7d32", // green theme
        backgroundColor: "rgba(46,125,50,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
}

export default LineChart;