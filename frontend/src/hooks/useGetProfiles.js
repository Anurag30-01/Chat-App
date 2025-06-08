import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useGetProfiles = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) return;
    const getConversations = async () => {
      if (!authUser) return;
      setLoading(true);
      try {
        const res = await fetch("/api/users", {
          method: "GET",
          credentials: "include", // ✅ This allows sending cookies (like jwt)
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err?.error || "Failed to fetch users");
        }

        const data = await res.json();
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [authUser]);

  return { loading, conversations };
};

export default useGetProfiles;
