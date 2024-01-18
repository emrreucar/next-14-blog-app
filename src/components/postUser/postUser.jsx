import Image from "next/image";
import styles from "./postUser.module.css";
import { getUser } from "@/lib/data";

//! FETCH DATA WITH AN API

const PostUser = async ({ userId }) => {
  const user = await getUser(userId);
  console.log(user);
  return (
    <div className={styles.container}>
      <Image
        src={user.img ? user.img : "/default-avatar.png"}
        alt="user image"
        width={50}
        height={50}
        className={styles.avatar}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}> {user.username} </span>
      </div>
    </div>
  );
};

export default PostUser;
