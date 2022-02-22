import { GetStaticProps } from "next";
import styles from "./styles/home.module.scss";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <img className={styles.imgRocket} src="images/board-user.svg" alt="" />
        <h1>
          Uma ferramenta para o seu dia a dia Escreva,
          <br /> planeje e organize-se...
        </h1>

        <h2>
          <span className={styles.greenEnphasis}>100% Gratuita </span>e online
        </h2>

        <h4>Apoiadores:</h4>
        <img
          className={styles.imgDonaters}
          src="http://sujeitoprogramador.com/steve.png"
          alt=""
        />
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60,
  };
};
