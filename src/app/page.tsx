"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };
  const handlLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if(form.email === "admin@gmail.com" && form.password ==="123456"){
      toast.success("Logged in successfully!")
      router.push("/dashboard");
    }else{
      toast.error("Invalid credentials!")
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handlLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-black">Login</h1>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="pt-4">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
