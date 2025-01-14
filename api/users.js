import pkg from 'pg';
const { Client } = pkg;
import bcrypt from "bcryptjs";
// import express from "express";

// const app = express();

// // Configure CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); // Update with your frontend's origin
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.use(express.json()); 

export default async function handler(req, res) {
  
  console.log("first req : ", req);
  if (req.method === "OPTIONS") {
    console.log("1");
    return res.status(200).end(); // Send success status
  }
  if(req.method === "GET") {
    console.log("2");

    return res.json("fetched");
  }
  
  else if (req.method === "POST") {
    console.log("3");

    const { action } = req.query;

    if (action === "login") {
      console.log("handling login");
      await handleLogin(req, res);
    } else {
      await handleRegister(req, res);
    }
  } 
  else {
    // res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Login handler
async function handleLogin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const client = new Client({
    connectionString: process.env.SUPABASE_CONNECTION_STRING_2,
  });

  try {
    await client.connect();

    const result = await client.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, result.rows[0].password_hash);
    if (isMatch) {
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  } finally {
    await client.end();
  }
}

// Register handler
async function handleRegister(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const client = new Client({
    connectionString: process.env.SUPABASE_CONNECTION_STRING_2,
  });

  try {
    await client.connect();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await client.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  } finally {
    await client.end();
  }
}