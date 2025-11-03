import { loginUser, registerUser } from "../services/user-service.js";
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

export const home = ((req,res)=> {
    res.send('<h1>Home</h1>');
});

export const register = async (req, res) => {
    const userInfo = req.body;
    try {
      const user = await registerUser(userInfo);
      const token = generateToken(user);
      
      res.json({
        message: 'Register Successfully',
        id: user._id,
        email: user.email,
        token
      });
    } catch (error) {
      console.error("Registration failed:", error);
      res.status(400).json({
        error: error.message || 'Registration failed'
      });
    }
}

export const login = async (req,res) => {
  const userInfo = req.body;
  try {
    const user = await loginUser(userInfo);
    if (user && user._id) {
      const token = generateToken(user);
      
      res.json({
        message: 'Login Successfully',
        id: user._id,
        email: user.email,
        token
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
  catch (error) {
    console.error("Login failed:", error);
    res.status(401).json({
      error: error.message || 'Login failed'
    });
  }
}
