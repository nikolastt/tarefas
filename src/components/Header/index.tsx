import React from "react";
import LoginButton from "../LoginButton";
import styles from "./styles.module.scss";

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="/images/logo.svg" alt="" />

        <nav className={styles.nav}>
          <a href="">Home</a>
          <a href="">Meu board</a>

          <div className={styles.button}>
            <LoginButton />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
