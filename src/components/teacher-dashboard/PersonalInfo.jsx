export default function PersonalInfo() {
  return (
    <section className="dashboard-card">
      <h2 className="tab-title">Personal Info</h2>

      <form className="row g-3 mt-2">
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter full name"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Date of Birth</label>
          <input type="date" className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone number"
          />
        </div>

        <div className="col-12">
          <button type="button" className="btn btn-primary">
            Save Personal Info
          </button>
        </div>
      </form>
    </section>
  );
}