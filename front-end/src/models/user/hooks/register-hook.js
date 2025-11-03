// hooks/register-hook.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/register-schema";
import { registerUser } from "../api/user-api.js";
import { useNavigate } from "react-router-dom";

export const useRegisterHook = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const doSubmit = async(data) => {
    try {
      const response = await registerUser(data);
      console.log("User registered: ", response);
      
      if (response.data.token) {
        // Store auth token and email
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', response.data.email);
        
        alert("Registration Successful");
        navigate('/dashboard');
      } else {
        console.log("Registration failed - no token received");
        alert("Registration failed - please try again");
      }
    } catch (error) {
      console.error("Registration Failed: ", error);
      alert(error.response?.data?.error || error.message || "Registration failed");
    }
  };

  return {
    register,
    handleSubmit,
    reset,
    errors,
    doSubmit
  };
};
