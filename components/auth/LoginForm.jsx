"use client";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "@/lib/actions/auth";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let hasErrors = false;

    if (!formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: "This email field is required",
      }));
      hasErrors = true;
    }

    if (!formData.password) {
      setErrors((prev) => ({
        ...prev,
        password: "This password field is required",
      }));
      hasErrors = true;
    }

    if (hasErrors) return;

    const isAuthenticated = await signIn({formData, setIsLoading});

    if (isAuthenticated) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@company.com"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.email && (
          <small className="text-red-600 text-sm">{errors.email}</small>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.password && (
          <small className="text-red-600 text-sm">{errors.password}</small>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
