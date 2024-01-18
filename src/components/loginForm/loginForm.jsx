"use client";

import React from "react";
import styles from "./loginForm.module.css";
import { login } from "@/lib/actions";
import Link from "next/link";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  const router = useRouter();

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      <span style={{ color: "red" }}>{state?.error}</span>
      <Link href="/register">
        {"Don't have an account?"}
        <b
          style={{
            textDecoration: "underline",
            marginLeft: "5px",
          }}
        >
          Sign In
        </b>
      </Link>
    </form>
  );
};

export default LoginForm;
