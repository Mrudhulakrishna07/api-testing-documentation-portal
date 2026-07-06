function PortalSelection({ setPortal }) {
  return (
    <div className="portal-page">
      <div className="portal-card">
        <h1>DevPortal</h1>

        <p>
          API Testing & Documentation Platform
        </p>

        <div
  className="portal-option"
  onClick={() => setPortal("admin")}
>
  <h2>Admin Login</h2>
</div>

<div
  className="portal-option"
  onClick={() => setPortal("developer")}
>
  <h2>Developer Login</h2>
</div>

      </div>
    </div>
  );
}

export default PortalSelection;