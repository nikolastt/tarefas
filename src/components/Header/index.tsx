import React from "react";
import LoginButton from "../LoginButton";
import styles from "./styles.module.scss";
import Link from "next/link";

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="/images/logo.svg" alt="" />

        <nav className={styles.nav}>
          <Link href="/">
            <a href="">Home</a>
          </Link>

          <Link href="/MyBoard">
            <a href="">Meu board</a>
          </Link>

          <div className={styles.button}>
            <LoginButton />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
