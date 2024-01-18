import { Post } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

//! GET: GET SINGLE POST
export const GET = async ({ params }) => {
  const { slug } = params;
  try {
    connectToDB();
    const post = await Post.findOne({ slug });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post!");
  }
};

//! DELETE: DELETE SINGLE POST
export const DELETE = async ({ params }) => {
  const { slug } = params;

  try {
    connectToDB();

    await Post.deleteOne({ slug });
    return NextResponse.json("Post deleted successfully");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete post!");
  }
};
