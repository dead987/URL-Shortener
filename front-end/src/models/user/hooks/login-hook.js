import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/login-schema";
import { loginUser } from "../api/user-api";
import { useNavigate } from "react-router-dom";

export const useLoginHook = () => {

    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const doSubmit = async(data) => {
        try {
          const response = await loginUser(data);
          console.log("User logged in: ", response);
          
          if (response.data.token) {
            // Store auth token and email
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmail', response.data.email);
            
            alert("Login Successful");
            navigate('/dashboard');
          } else {
            console.log("Login failed - no token received");
            alert("Login failed - please try again");
          }
        } catch (error) {
          console.error("Login Failed: ", error);
          alert(error.response?.data?.error || error.message || "Login failed");
        }
      };

    return {register, handleSubmit, errors, doSubmit};
};