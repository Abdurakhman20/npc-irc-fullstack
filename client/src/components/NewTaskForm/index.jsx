import { useState } from "react";

import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./index.module.scss";

import { AiOutlineClose } from "react-icons/ai";

const NewTaskForm = ({ formType, isOpen, setIsOpen, gridRef }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState("");
  const [taskId, setTaskId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      status: isCompleted,
      end_date: endDate,
      user_id: Number(userId),
    };

    const createUrl = "http://localhost:3030/api/task/create";
    const updateUrl = `http://localhost:3030/api/task/update/${taskId}`;

    fetch(formType === "create" ? createUrl : updateUrl, {
      method: formType === "create" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(
          formType === "create"
            ? "The task was successfully created!"
            : "The task was successfully updated!"
        );
        console.log(data);
        gridRef.current.api.refreshInfiniteCache();
        setIsOpen(false);
      })
      .catch((error) => console.error(error));

    // Делаем что-то с formData, например отправляем на сервер

    // Сбрасываем значения инпутов
    setTitle("");
    setDescription("");
    setIsCompleted(false);
    setEndDate("");
    setUserId("");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>
            {formType === "create" ? "Create" : "Update"}
          </h2>
          <AiOutlineClose className={styles.icon} onClick={handleClose} />
        </div>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <Input
            placeholder="title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>
            <span>Status: Is Completed?</span>
            <select
              value={isCompleted}
              onChange={(e) => setIsCompleted(e.target.value === "true")}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </label>
          <label>
            <span>End date</span>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <Input
            placeholder="User id..."
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          {formType === "update" && (
            <Input
              placeholder="Task id..."
              type="number"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
            />
          )}
          <Button type="submit">Add</Button>
        </form>
      </div>
    </div>
  );
};

export default NewTaskForm;
