// import React from "react";

// const Login = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email:</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password:</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate(); // Initialize navigate

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/auth/login", { email, password }, { withCredentials: true });

//       if (res.status === 200) {
//         setMessage("Login successful! Redirecting...");
//         setTimeout(() => navigate("/home")); // Redirect after 1.5 sec
//       } else {
//         setMessage(res.data.message || "Login failed!");
//       }
//     } catch (error) {
//       setMessage("Login failed!");
//       console.error(error);
//     }
//   };

//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:5000/auth/google";
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-green-400">
//       <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
//         <h2 className="text-3xl font-extrabold text-center text-green-700">Login</h2>

//         <form onSubmit={handleLogin} className="mt-6">
//           <div className="mb-4">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
//           >
//             Login
//           </button>
//         </form>

//         {message && <p className="mt-4 text-center text-red-500 font-medium">{message}</p>}

//         <div className="mt-6 flex items-center justify-center">
//           <button
//             onClick={handleGoogleLogin}
//             className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
//           >
//             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M21.35 11.1H12v2.8h5.45c-.25 1.4-.95 2.55-2 3.35v2.8h3.2c1.9-1.75 3-4.3 3-7.15 0-.7-.05-1.35-.15-2Z" fill="#4285F4" />
//               <path d="M12 22c2.7 0 5-1 6.7-2.65l-3.2-2.8c-.9.6-2 1-3.5 1-2.7 0-5-1.8-5.8-4.2H2.3v2.7C4 19 7.7 22 12 22Z" fill="#34A853" />
//               <path d="M6.2 13.35c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V6.65H2.3C1.5 8.35 1 10.1 1 12s.5 3.65 1.3 5.35l3.9-3.95Z" fill="#FBBC05" />
//               <path d="M12 4.5c1.6 0 3 .55 4.15 1.65l3.05-3.05C17 1 14.7 0 12 0 7.7 0 4 2.95 2.3 6.65l3.9 3.9c.8-2.4 3.1-4.05 5.8-4.05Z" fill="#EA4335" />
//             </svg>
//             Login with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { FiMail, FiLock } from "react-icons/fi";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/auth/login",
//         { email, password },
//         { withCredentials: true }
//       );
//       const { token, user } = res.data;
//       localStorage.setItem("authToken", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       navigate("/dashboard");
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Login failed!");
//     }
//   };

//   return (
//     <>
//     <Header />
  
//     <div className="flex flex-col min-h-screen bg-green-50 pt-20">
//       <div className="flex-grow flex items-center justify-center px-4 pb-8">
//         <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
//           <h2 className="text-2xl font-extrabold text-center text-green-700 mb-6">
//             Farmer Login
//           </h2>
  
//           {message && (
//             <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm">
//               {message}
//             </div>
//           )}
  
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="relative">
//               <FiMail className="absolute top-3 left-3 text-gray-400" />
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
  
//             <div className="relative">
//               <FiLock className="absolute top-3 left-3 text-gray-400" />
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
  
//             <button
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-all duration-300"
//             >
//               Login
//             </button>
//           </form>
  
//           <p className="mt-4 text-sm text-center text-gray-600">
//             Don’t have an account?{" "}
//             <span
//               className="text-green-600 hover:underline cursor-pointer"
//               onClick={() => navigate("/register")}
//             >
//               Register here
//             </span>
//           </p>
//         </div>
//       </div>
  
//       <Footer />
//     </div>
//   </>
  
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        { email, password },
        { withCredentials: true }
      );
      const { token, user } = res.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-green-50 pt-20">
        <div className="flex-grow flex items-center justify-center px-4 pb-8">
          <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-extrabold text-center text-green-700 mb-6">
              Farmer Login
            </h2>

            {message && (
              <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <FiMail className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <FiLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-all duration-300"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                className="text-green-600 hover:underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
