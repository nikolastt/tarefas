import React from "react";
import { IoMdAdd } from "react-icons/io";
import Task from "../../components/Task";
import styles from "./styles.module.scss";

function MyBoard() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.head}>
          <input
            type="text"
            placeholder="Qual a sua tarefa?"
            className={styles.input}
          />
          <div className={styles.iconAdd}>
            <IoMdAdd color="black" />
          </div>
        </div>
        <Task />
        <Task />
      </div>
    </div>
  );
}

export default MyBoard;
