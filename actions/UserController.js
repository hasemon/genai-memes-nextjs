"use server";

import { getCollection } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jsonToken from "jsonwebtoken";
import { redirect } from "next/navigation";

function isAlphaNumaric(str) {
  const regex = /^[a-zA-Z0-9]*$/;
  return regex.test(str);
}

export async function login(prevState, formData) {
  const failedObject = {
    success: false,
    error: "Invalid username or password",
  };
  const userData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  if (typeof userData.username != "string") {
    userData.username = "";
  }
  if (typeof userData.password != "string") {
    userData.password = "";
  }
  userData.username = userData.username.trim();
  userData.password = userData.password.trim();

  const collection = await getCollection("users");
  const user = await collection.findOne({ username: userData.username });

    if (!user) {
      return failedObject;
  }

  const matchOrNot = await bcrypt.compareSync(userData.password, user.password);
    if (!matchOrNot) {
      return failedObject;
    }
    
    const ourTokenValue = jsonToken.sign(
      {
        status: "ok",
        user_id: user._id,
        username: userData.username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      },
      process.env.JSON_TOKEN_KEY
    );

    // Log the user giving them a cookie
    cookies().set("genai", ourTokenValue, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
    });

    return redirect("/");
}

export async function logout() {
  cookies().delete('genai');
  redirect("/");
}

export async function register(prevState, formData) {
  // TODO: validate with ZOD
  const errors = {};

  const userData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  if (typeof userData.username != "string") {
    userData.username = "";
  }
  if (typeof userData.password != "string") {
    userData.password = "";
  }
  userData.username = userData.username.trim();
  userData.password = userData.password.trim();

  // validate username
  if (userData.username.length == 0) {
    errors.username = "Username is required";
  }
  if (userData.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }
  if (userData.username.length > 20) {
    errors.username = "Username must be less than 20 characters";
    }
    
    // user unique or not
    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ username: userData.username });

    if (user) {
      errors.username = "Username already exists";
    }


  if (!isAlphaNumaric(userData.username)) {
    errors.username = "Username can only contain letters and numbers";
  }

  // validate password
  if (userData.password.length == 0) {
    errors.password = "Password is required";
  }
  if (userData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (userData.password.length > 20) {
    errors.password = "Password must be less than 20 characters";
  }

  if (errors.username || errors.password) {
    return {
      errors: errors,
      success: false,
    };
  }

  // hash passsword

  const salt = bcrypt.genSaltSync(10);
  userData.password = bcrypt.hashSync(userData.password, salt);

  // Store the user in the database

  const newUser = await usersCollection.insertOne(userData);
  const userId = newUser.insertedId.toString();

  // create json token value

  const ourTokenValue = jsonToken.sign(
    {
      status: "ok",
      user_id: userId,
      username: userData.username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    },
    process.env.JSON_TOKEN_KEY
  );

  // Log the user giving them a cookie
  cookies().set("genai", ourTokenValue, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
  });

  return {
    success: true,
  };
}
