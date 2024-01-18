import mongoose from "mongoose";

//! buradaki connection amacı sayfa render olduğunda ya da sunucu kapatılıp açıldığında tekrardan bizim database'imizi bulsun diye...
const connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }

    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
