import React from "react";
import { useRegisterHook } from "../hooks/register-hook";
import { Link } from "react-router-dom";
import { Mail, Lock, User as UserIcon, ArrowRight, UserPlus } from "lucide-react";

const Register = () => {
  const { register, handleSubmit, reset, errors, doSubmit } = useRegisterHook();

  return (
    <div className="relative h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-slate-700/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-600/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-500/10 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              Login
            </Link>
            {/* <Link
              to="/about"
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              About
            </Link> */}
          </div>
        </div>
      </nav>

      {/* Register Form Container */}
      <div className="relative z-10 w-full max-w-[420px] px-6">
        {/* Compact Card */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-slate-700/50 p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-700/50 rounded-xl mb-3 border border-slate-600/50">
              <UserPlus className="w-6 h-6 text-slate-300" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-100 mb-1 tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-400 text-xs">
              Sign up to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(doSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all"
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:border-slate-600 transition-all"
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-slate-700 hover:bg-slate-600 text-slate-100 py-2.5 px-4 rounded-lg font-medium text-sm focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center group"
            >
              Create Account
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 mb-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-slate-800/40 text-slate-500">
                  Already have an account?
                </span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Link
              to="/login"
              className="text-xs text-slate-400 hover:text-slate-300 transition-colors inline-flex items-center"
            >
              Sign in instead
              <ArrowRight className="ml-1 w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-slate-500 text-xs mt-4">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-slate-400 hover:text-slate-300 transition-colors">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-slate-400 hover:text-slate-300 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Register;
