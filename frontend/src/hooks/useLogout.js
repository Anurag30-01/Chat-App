import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = () => {
    setLoading(true);
    try {
      localStorage.removeItem("chat-user");
      setAuthUser(null);

      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
