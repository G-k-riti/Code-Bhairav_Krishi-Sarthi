// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer"; // ✅ Import Footer
// import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";

// const Register = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/auth/register",
//         { fullName, email, password, phone_number: phoneNumber },
//         { withCredentials: true }
//       );
//       setMessage(res.data.message);
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Registration failed!");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col justify-between min-h-screen bg-green-50 pt-24 px-0 w-full">

//         <div className="flex justify-center items-center flex-grow">
//           <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
//             <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
//               Farmer Registration
//             </h2>

//             {message && (
//               <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm text-center">
//                 {message}
//               </div>
//             )}

//             <form onSubmit={handleRegister} className="space-y-4">
//               <div className="relative">
//                 <FiUser className="absolute top-3 left-3 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <FiMail className="absolute top-3 left-3 text-gray-400" />
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <FiLock className="absolute top-3 left-3 text-gray-400" />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <FiPhone className="absolute top-3 left-3 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Phone Number"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-all duration-300"
//               >
//                 Register
//               </button>
//             </form>

//             <p className="mt-4 text-sm text-center text-gray-600">
//               Already have an account?{" "}
//               <span
//                 className="text-green-600 hover:underline cursor-pointer"
//                 onClick={() => navigate("/login")}
//               >
//                 Login here
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* ✅ Add Footer at the end */}
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Register;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/register",
        { fullName, email, password, phone_number: phoneNumber },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col justify-between min-h-screen bg-green-50 pt-24 px-0 w-full">
        <div className="flex justify-center items-center flex-grow">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
              Farmer Registration
            </h2>

            {message && (
              <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm text-center">
                {message}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <FiUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div className="relative">
                <FiMail className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div className="relative">
                <FiLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div className="relative">
                <FiPhone className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-all duration-300"
              >
                Register
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                className="text-green-600 hover:underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Register;
