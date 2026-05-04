import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // temporary
    localStorage.setItem(
      "token",
      "thinkflow-user"
    );

    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-60 h-60 bg-cyan-500 blur-[120px] opacity-20 rounded-full" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-violet-500 blur-[120px] opacity-20 rounded-full" />

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 relative z-10">
        <button
          onClick={() => navigate("/")}
          className="mb-6 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-3xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-400 mb-8">
          Login to ThinkFlow AI
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none"
              required
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-12 pr-12 outline-none"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4 text-gray-400"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition rounded-2xl py-4 font-semibold"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don’t have an account?{" "}
          <button
            onClick={() =>
              navigate("/signup")
            }
            className="text-cyan-400"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}