import styles from "./index.module.scss";
import UsersList from "../../components/UsersList";

const Tables = () => {
  return (
    <div className={styles.tablesContainer}>
      <div className={`ag-theme-alpine-dark ${styles.tableFirstRow}`}>
        <UsersList />
      </div>
      <div className={styles.tableSecondRow}></div>
    </div>
  );
};

export default Tables;
