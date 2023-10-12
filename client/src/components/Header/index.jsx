import styles from "./index.module.scss";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

const Header = ({ openSidebar }) => {
  return (
    <header className={styles.header}>
      <div className={styles.menuIcon}>
        <BsJustify className={styles.icon} onClick={openSidebar} />
      </div>
      <div className={styles.headerLeft}>
        <BsSearch className={styles.icon} />
      </div>
      <div className={styles.headerRight}>
        <BsFillBellFill className={styles.icon} />
        <BsFillEnvelopeFill className={styles.icon} />
        <BsPersonCircle className={styles.icon} />
      </div>
    </header>
  );
};

export default Header;
