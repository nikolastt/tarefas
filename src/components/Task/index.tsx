import React from "react";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

import styles from "./styles.module.scss";

interface taskProps {
  task: {
    id: string;
    dateTask: string | Date;
    dateFormated?: string;
    name: string;
    userId: string;
    task: string;
  };
  DeleteTask: Function;
  updateTask: Function;
}

function Task({ task, DeleteTask, updateTask }: taskProps) {
  return (
    <div className={styles.taskContainer}>
      <h4>{task.task}</h4>

      <div className={styles.taskFooter}>
        <div className={styles.data}>
          <BsCalendar2EventFill color="#ffb800" />
          <p>{task.dateFormated}</p>
        </div>

        <button
          className={styles.btnUpdateTask}
          onClick={() => updateTask(task)}
        >
          <AiFillEdit />
          <p>Editar</p>
        </button>

        <button
          className={styles.btnDeleteTask}
          onClick={() => DeleteTask(task)}
        >
          <FaTrash className={styles.trashIcon} color="red" /> Excluir
        </button>
      </div>
    </div>
  );
}

export default Task;
