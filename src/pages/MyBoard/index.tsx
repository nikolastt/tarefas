import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session?.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
