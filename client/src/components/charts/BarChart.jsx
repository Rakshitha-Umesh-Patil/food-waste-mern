import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart({ data = {} }) {
  const chartData = {
    labels: ["Breakfast", "Lunch", "Dinner"],
    datasets: [
      {
        label: "Food Waste (kg)",
        data: [
          data.breakfast || 0,
          data.lunch || 0,
          data.dinner || 0,
        ],
        backgroundColor: "#2e7d32", // green theme
      },
    ],
  };

  return <Bar data={chartData} />;
}

export default BarChart;