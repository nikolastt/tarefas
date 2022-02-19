import React from "react";
import styles from "./styles.module.scss";
import { AiOutlineGithub } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

function LoginButton() {
  const session = true;

  return (
    <>
      {session ? (
        <div className={styles.container}>
          <button className={styles.button}>
            <div className={styles.photoUser}>
              <img src="/images/logo.svg" alt="Foto Usuário" />
            </div>
            <span>Olá Nikolas</span>
          </button>
          <div className={styles.logOutIcon}>
            <FiLogOut />
          </div>
        </div>
      ) : (
        <button className={styles.button}>
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
