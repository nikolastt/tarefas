import React from "react";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

import styles from "./styles.module.scss";

function Task() {
  return (
    <div className={styles.taskContainer}>
      <h4>Tarefa</h4>

      <div className={styles.taskFooter}>
        <BsCalendar2EventFill color="#ffb800" />
        <p>17 de Julho de 2021</p>

        <button>
          <FaTrash className={styles.trashIcon} color="red" /> Excluir
        </button>
      </div>
    </div>
  );
}

export default Task;
