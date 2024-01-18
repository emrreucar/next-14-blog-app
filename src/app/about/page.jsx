import React from "react";
import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "About Page Description",
};

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subTitle}>About Agency</h2>
        <h1 className={styles.title}>
          We create digital ideas that are bigger, bolder, braver and better.
        </h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, ipsa.
          Voluptatum dolorum libero numquam vel fugiat, assumenda amet nesciunt
          facilis adipisci dolor ipsum blanditiis deserunt, distinctio magni
          quae ab et eum excepturi modi molestiae perspiciatis debitis ut! Hic,
          reprehenderit veritatis!
        </p>

        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experince</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experince</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experince</p>
          </div>
        </div>
      </div>

      <div className={styles.imgContainer}>
        <Image
          src={"/about.png"}
          alt="About Image"
          fill
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default AboutPage;
