import { Link } from "react-router-dom";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

import { AiOutlineClose } from "react-icons/ai";
import { BiLogoReact } from "react-icons/bi";
import styles from "./index.module.scss";

const Sidebar = ({ openSidebarToggle, openSidebar }) => {
  return (
    <aside
      id={styles.sidebar}
      className={openSidebarToggle ? `${styles.sidebarResponsive}` : ""}
    >
      <div className={styles.sidebarTitle}>
        <div className={styles.sidebarLogo}>
          <BiLogoReact className={styles.iconHeader} />
          NPC-IRS
        </div>
        <AiOutlineClose
          className={`${styles.icon} ${styles.closeIcon}`}
          onClick={openSidebar}
        />
      </div>
      <ul className={styles.sidebarList}>
        <li className={styles.sidebarListItem}>
          <Link to="/tables">
            <BsFillGrid3X3GapFill className={styles.icon} /> Tables
          </Link>
        </li>
        <li className={styles.sidebarListItem}>
          <Link to="/">
            <BsGrid1X2Fill className={styles.icon} /> Dashboard
          </Link>
        </li>

        <li className={styles.sidebarListItem}>
          <a href="/#">
            <BsFillArchiveFill className={styles.icon} /> Products
          </a>
        </li>
        <li className={styles.sidebarListItem}>
          <a href="/#">
            <BsPeopleFill className={styles.icon} /> Customers
          </a>
        </li>
        <li className={styles.sidebarListItem}>
          <a href="/#">
            <BsListCheck className={styles.icon} /> Inventory
          </a>
        </li>
        <li className={styles.sidebarListItem}>
          <a href="/#">
            <BsMenuButtonWideFill className={styles.icon} /> Reports
          </a>
        </li>
        <li className={styles.sidebarListItem}>
          <a href="/#">
            <BsFillGearFill className={styles.icon} /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
