import { useState } from "react";
import { addFoodData } from "../api/api";
import "../styles/dashboard.css";

export default function DataEntry() {
  const [data, setData] = useState({
    mealType: "Breakfast",
    preparedQty: "",
    consumedQty: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        mealType: data.mealType,
        preparedQty: Number(data.preparedQty),
        consumedQty: Number(data.consumedQty),
        date: data.date,
      };

      await addFoodData(payload);

      alert("Food Entry Added ✅");

      setData({
        mealType: "Breakfast",
        preparedQty: "",
        consumedQty: "",
        date: "",
      });

    } catch (err) {
      alert(err.response?.data?.message || "Submission Failed ❌");
    }
  };

  return (
    <div className="data-wrapper">

      <h2 className="data-title">🍱 Food Data Entry</h2>

      <form className="data-card" onSubmit={handleSubmit}>

        <select
          value={data.mealType}
          onChange={(e) =>
            setData({ ...data, mealType: e.target.value })
          }
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>

        <input
          type="number"
          placeholder="Prepared Quantity (kg)"
          value={data.preparedQty}
          onChange={(e) =>
            setData({ ...data, preparedQty: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Consumed Quantity (kg)"
          value={data.consumedQty}
          onChange={(e) =>
            setData({ ...data, consumedQty: e.target.value })
          }
        />

        <input
          type="date"
          value={data.date}
          onChange={(e) =>
            setData({ ...data, date: e.target.value })
          }
        />

        <button type="submit">Submit Data</button>

      </form>
    </div>
  );
}