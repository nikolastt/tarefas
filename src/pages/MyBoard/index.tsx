import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { AiFillExclamationCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import Task from "../../components/Task";
import styles from "./styles.module.scss";
import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { format } from "date-fns";

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
  const [taskEdit, setTaskEdit] = useState<taskList | null>(null);

  function cancelEditing() {
    setInput("");
    setTaskEdit(null);
  }

  async function updateTask(task: taskList) {
    setInput(task.task);
    setTaskEdit(task);
  }

  async function DeleteTask(task: taskList) {
    await deleteDoc(doc(db, "tasks", task.id)).then(() => {
      setTasksList(
        tasksList.filter((item) => {
          return item.id != task.id;
        })
      );
    });
  }

  async function Submit() {
    if (input === "") {
      return;
    }

    if (taskEdit) {
      const taskRef = doc(db, "tasks", taskEdit.id);
      await updateDoc(taskRef, {
        task: input,
      }).then(() => {
        tasksList.map((item) => {
          if (item.id == taskEdit.id) {
            item.task = input;

            setTaskEdit(null);
            setInput("");
          }
        });

        // let data = tasksList;
        // const index = tasksList.findIndex((item) => item.id === taskEdit.id);
        // data[index].task = input;
        // setTasksList(data);
        // setTaskEdit(null);
        // setInput("");
      });
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
        {taskEdit != null ? (
          <div className={styles.onEditing}>
            <AiFillExclamationCircle color="white" size="30" />
            <h3>Você está editando uma tarefa!</h3>
          </div>
        ) : null}

        <div className={styles.head}>
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            value={input}
            placeholder="Qual a sua tarefa?"
            className={styles.input}
          />

          <button onClick={() => Submit()} className={styles.iconAdd}>
            <IoMdAdd color="black" />
          </button>

          {taskEdit != null ? (
            <button
              className={styles.closeCircle}
              onClick={() => cancelEditing()}
            >
              <AiFillCloseCircle size="30" color="red" />
            </button>
          ) : null}
        </div>

        {tasksList.map((task) => {
          return (
            <Task
              task={task}
              key={task.id}
              updateTask={updateTask}
              DeleteTask={DeleteTask}
            />
          );
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
