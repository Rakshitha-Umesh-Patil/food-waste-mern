import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
      className="d-flex flex-column"
    >
      {/* LIGHT OVERLAY */}
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.6)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar */}
        <nav className="navbar navbar-dark bg-success px-4">
          <span className="navbar-brand fw-bold">
            Food Waste Management System
          </span>

          <div>
            <button
              className="btn btn-light me-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </nav>

        {/* HERO SECTION (BIG TEXT) */}
        <div className="container text-center flex-grow-1 d-flex flex-column justify-content-center px-3">

          <h1
            className="fw-bold mb-3"
            style={{ color: "#1b5e20", fontSize: "3.2rem" }}
          >
            Smart Food Waste Management System
          </h1>

          <p
  className="text-dark mb-3 fw-semibold"
  style={{ fontSize: "1.6rem", lineHeight: "1.5" }}
>
  Monitor, analyze and reduce food wastage in hostels and institutions.
</p>

<p
  className="text-muted mb-4 fw-medium"
  style={{ fontSize: "1.3rem", lineHeight: "1.6" }}
>
  Track food preparation, consumption, and waste in real time to improve efficiency and reduce excess cooking.
</p>
          {/* SMALL IMPACT CARDS */}
          <div className="container mb-4">
            <div className="row justify-content-center g-3">

              {/* Institutes */}
              <div className="col-md-4">
                <div className="card shadow-sm border-0 text-center p-3">
                  <h2 className="text-success fw-bold">500+</h2>
                  <h6 className="fw-bold">Institutes Joined</h6>
                  <p className="small text-secondary mb-0">
                    Colleges & hostels using the system
                  </p>
                </div>
              </div>

              {/* NGOs */}
              <div className="col-md-4">
                <div className="card shadow-sm border-0 text-center p-3">
                  <h2 className="text-success fw-bold">100+</h2>
                  <h6 className="fw-bold">NGOs & Homes</h6>
                  <p className="small text-secondary mb-0">
                    Food redistributed to communities
                  </p>
                </div>
              </div>

              {/* Animal Shelters */}
              <div className="col-md-4">
                <div className="card shadow-sm border-0 text-center p-3">
                  <h2 className="text-success fw-bold">80+</h2>
                  <h6 className="fw-bold">Animal Shelters</h6>
                  <p className="small text-secondary mb-0">
                    Excess food safely shared
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* BUTTONS */}
          {/* BUTTONS */}
<div>
  <button
    className="btn btn-success me-3 px-4 py-2"
    style={{ fontSize: "1.2rem" }}
    onClick={() => {
      const role = localStorage.getItem("role");

      if (!role) {
        navigate("/login");
      } else if (role === "institute") {
        navigate("/data-entry");
      } else {
        alert("Only Institutes can add food entry");
      }
    }}
  >
    Add Food Entry
  </button>

  <button
    className="btn btn-outline-success px-4 py-2"
    style={{ fontSize: "1.2rem" }}
    onClick={() => {
      const role = localStorage.getItem("role");

      if (!role) {
        navigate("/login");
      } else if (role === "institute") {
        navigate("/institute-dashboard");
      } else if (role === "ngo") {
        navigate("/ngo-dashboard");
      }
    }}
  >
    View Dashboard
  </button>
</div>

        </div>

        {/* FOOTER */}
        <footer className="bg-success text-white text-center py-2 mt-auto">
          © 2026 Food Waste Management System
        </footer>
      </div>
    </div>
  );
}