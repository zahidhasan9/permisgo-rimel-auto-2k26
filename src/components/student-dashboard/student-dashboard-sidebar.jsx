import Link from "next/link";

// Styles

const dashboardSidebar = () => {
  return (
    <>
      <div className={""}>
        <ul>
          <li>
            <Link href="">Dashboard</Link>
          </li>
          <li>
            <Link href="">Personal Info</Link>
          </li>
          <li>
            <Link href="">Offers</Link>
          </li>
          <li>
            <Link href="">Code de la route</Link>
          </li>
          <li>
            <Link href="">Driving Operations</Link>
          </li>
          <li>
            <Link href="">My Réperences</Link>
          </li>
          <li>
            <Link href="">Support</Link>
          </li>
          <li>
            <Link href="">Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default dashboardSidebar;
