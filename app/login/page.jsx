import React from "react";
import {redirect} from "next/navigation";
import LoginForm from "@/components/Auth/LoginForm";

export default function Login() {
  // if (status === "authenticated") {
  //   redirect("/dashboard/home/overview");
  // }
  return <LoginForm />;
}
