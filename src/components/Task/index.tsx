import React from "react";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

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
}

function Task({ task }: taskProps) {
  return (
    <div className={styles.taskContainer}>
      <h4>{task.task}</h4>

      <div className={styles.taskFooter}>
        <BsCalendar2EventFill color="#ffb800" />
        <p>{task.dateFormated}</p>

        <button>
          <FaTrash className={styles.trashIcon} color="red" /> Excluir
        </button>
      </div>
    </div>
  );
}

export default Task;
