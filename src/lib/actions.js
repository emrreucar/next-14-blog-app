"use server";

import { Post, User } from "./models";
import { connectToDB } from "./utils";
import { signIn, signOut } from "./auth";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export const addPost = async (prevState, formData) => {
  //! solution 1
  //   const title = formData.get("title");
  //   const desc = formData.get("desc");
  //   const slug = formData.get("slug");
  //   const userId = formData.get("userId");

  //! solution 2
  const { title, desc, slug, userId, img } = Object.fromEntries(formData);

  try {
    connectToDB();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
      img,
    });

    await newPost.save();
    console.log("saved to db!");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }

  //   console.log(title, desc, slug, userId);
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();

    await Post.findByIdAndDelete(id);
    console.log("deleted from db!");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDB();

    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("saved to db!");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";

  await signIn("github");
};

export const handleLogout = async () => {
  "use server";

  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDB();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "User already exists!" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
      // passwordRepeat,
    });

    await newUser.save();
    console.log("Saved to db!");

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    console.log(error);

    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }

    // return { error: "Something went wrong!" };

    throw error;
  }
};
