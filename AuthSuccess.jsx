// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthSuccess = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("token");

//     if (token) {
//       localStorage.setItem("authToken", token);
//       navigate("/dashboard"); // Redirect to Dashboard
//     } else {
//       navigate("/login"); // Redirect to login if no token found
//     }
//   }, [navigate]);

//   return <div>Authenticating...</div>;
// };

// export default AuthSuccess;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    const fetchUserDetails = async (token) => {
      try {
        // Store token
        localStorage.setItem("authToken", token);

        // Fetch user data
        const res = await fetch("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const userData = await res.json();
          localStorage.setItem("user", JSON.stringify(userData)); // save to localStorage
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };

    if (token) {
      fetchUserDetails(token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default AuthSuccess;
