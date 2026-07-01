export default function Location() {
  return (
    <section className="dashboard-card">
      <h2 className="tab-title">Location</h2>

      <form className="row g-3 mt-2">
        <div className="col-md-6">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter city"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Default Location</label>
          <select className="form-select">
            <option>Select default location</option>
            <option>Main Campus</option>
            <option>City Campus</option>
            <option>Admin Building</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Enter full address"
          ></textarea>
        </div>

        <div className="col-12">
          <button type="button" className="btn btn-primary">
            Save Location
          </button>
        </div>
      </form>
    </section>
  );
}