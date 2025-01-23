import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register Admin
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create new admin
    admin = new Admin({ email, password });
    await admin.save();
    console.log("Admin registered successfully:",admin)

    res.status(201).send("Admin Register Successfull");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin?.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      admin: {
        id: admin?.id,
      },
    };

    const token = jwt.sign(payload, process.env.MY_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
    console.log("admin logged in successfull");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
