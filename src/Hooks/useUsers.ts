import { useEffect, useState } from "react";
import userService, { Users } from "../services/user-service";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const { request, cancel } = userService.getAll();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => cancel();
  }, []);

  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
