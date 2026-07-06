export default function MainLayout({ children }) {
  return (
    <div>
      <div>Sidebar</div>

      <div>
        <header>API Testing Documentation Portal</header>

        {children}

        <footer>Internship Project</footer>
      </div>
    </div>
  );
}