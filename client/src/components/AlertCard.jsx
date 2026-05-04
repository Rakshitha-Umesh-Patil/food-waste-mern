function AlertCard({ alert, onAccept, onPicked }) {
  if (!alert) return null;

  const institute = alert.instituteId || {};
  const food = alert.foodEntryId || {};

  const getStatusColor = () => {
    if (alert.status === "picked") return "success";
    if (alert.status === "accepted") return "primary";
    return "warning";
  };

  return (
    <div className={`card border-${getStatusColor()} shadow-sm mb-3`}>
      <div className="card-body">

        <h5 className="card-title text-success fw-bold">
          {institute.name}
        </h5>

        <p className="mb-1">
          <b>Meal:</b> {food.mealType}
        </p>

        <p className="mb-1">
          <b>Waste Qty:</b> {food.wasteQty} plates
        </p>

        <p className="mb-2">
          <b>Date:</b>{" "}
          {food.date
            ? new Date(food.date).toLocaleDateString()
            : "N/A"}
        </p>

        <span className={`badge bg-${getStatusColor()} mb-3`}>
          {alert.status?.toUpperCase()}
        </span>

        <div className="d-flex gap-2">
          {alert.status === "pending" && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => onAccept(alert._id)}
            >
              Accept
            </button>
          )}

          {alert.status === "accepted" && (
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => onPicked(alert._id)}
            >
              Mark Picked
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default AlertCard;