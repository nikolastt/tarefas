import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Task from "../../components/Task";
import styles from "./styles.module.scss";
import { db } from "../../firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { format } from "date-fns";
import { query, orderBy } from "firebase/firestore";

type taskList = {
  id: string;
  dateTask: string | Date;
  formatDate?: string;
  name: string;
  userId: string;
  task: string;
};

interface boardProps {
  user: {
    name: string;
    id: string;
  };
  tasks: string;
}

function MyBoard({ user, tasks }: boardProps) {
  const [input, setInput] = useState("");
  const [tasksList, setTasksList] = useState<taskList[]>(JSON.parse(tasks));

  async function Submit() {
    if (input === "") {
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        dateTask: new Date(),
        name: user.name,
        userId: user.id,
        task: input,
      }).then((doc) => {
        let data = {
          id: doc.id,
          dateTask: new Date(),
          dateFormated: format(new Date(), "dd, MMMM, yyyy"),
          name: user.name,
          userId: user.id,
          task: input,
        };

        setTasksList([...tasksList, data]);
        setInput("");
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.head}>
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Qual a sua tarefa?"
            className={styles.input}
          />
          <button onClick={() => Submit()} className={styles.iconAdd}>
            <IoMdAdd color="black" />
          </button>
        </div>

        {tasksList.map((task) => {
          return <Task task={task} key={task.id} />;
        })}
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
        destination: "/RedirectLoginPage",
        permanent: false,
      },
    };
  }

  const user = {
    name: session.user.name,
    id: session.id,
  };

  const querySnapshot = await getDocs(collection(db, "tasks"));

  const tasks = JSON.stringify(
    querySnapshot.docs.map((task) => {
      return {
        id: task.id,
        dateFormated: format(task.data().dateTask.toDate(), "dd MMMM yyyy"),
        ...task.data(),
      };
    })
  );

  return {
    props: {
      user,
      tasks,
    },
  };
};
