"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AppDispatch } from "@/redux/store";
import {
  setUser,
  authFailure,
  authStart,
} from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/features/auth/authApi";

// Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    dispatch(authStart());
    try {
      const response = await login(data).unwrap();
      const { user, accessToken } = response.data;

      dispatch(setUser({ user, token: accessToken }));

      router.push("/");

      toast.success("Login successful!");
    } catch (err: any) {
      const message = err?.data?.message || "Login failed";
      dispatch(authFailure(message));
      toast.error(message);
    }
  };

  // Quick login
  const quickLogin = (role: "admin" | "student") => {
    if (role === "admin") {
      setValue("email", "admin@gmail.com");
      setValue("password", "123456");
    } else {
      setValue("email", "alauddin@gmail.com");
      setValue("password", "123456");
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        {/* Quick Login Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => quickLogin("admin")}
            className="w-1/2 mr-2 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Admin Login
          </button>
          <button
            onClick={() => quickLogin("student")}
            className="w-1/2 ml-2 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
          >
            Student Login
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition"
          >
            {isSubmitting ? "Logging in..." : "Sign In"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
