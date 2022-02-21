import React from "react";
import styles from "./styles.module.scss";
import { AiOutlineGithub } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";

function LoginButton() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div className={styles.container}>
          <button className={styles.button}>
            <div className={styles.photoUser}>
              <img src={session.user.image} alt="Foto Usuário" />
            </div>
            <span>Olá {session.user.name}</span>
          </button>
          <div onClick={() => signOut()} className={styles.logOutIcon}>
            <FiLogOut color="#ffb800" />
          </div>
        </div>
      ) : (
        <button onClick={() => signIn("github")} className={styles.button}>
          <div className={styles.icon}>
            <AiOutlineGithub color="#ffb800" size="35" />
          </div>
          Entrar com GitHub
        </button>
      )}
    </>
  );
}

export default LoginButton;
