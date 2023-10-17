import styles from "./index.module.scss";
import UsersList from "../../components/UsersList";
import TasksList from "../../components/TasksList";

const Tables = () => {
  return (
    <div className={styles.tablesContainer}>
      <div className={`ag-theme-alpine-dark ${styles.tableFirstRow}`}>
        <UsersList />
      </div>
      <div className={`ag-theme-alpine-dark ${styles.tableSecondRow}`}>
        <TasksList />
      </div>
    </div>
  );
};

export default Tables;
