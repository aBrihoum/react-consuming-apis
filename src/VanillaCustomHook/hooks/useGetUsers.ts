import { useEffect, useState } from "react";
import UserService, { UserT } from "../services/user-service";
import { CanceledError } from "../services/api-client";
const useGetUsers = () => {
  const [users, setUsers] = useState<UserT[]>([]);
  const [originalUsers, setOriginalUsers] = useState<UserT[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, abort } = UserService.getAllEntities<UserT>();
    request
      .then((res) => {
        setUsers(res.data);
        setOriginalUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => abort();
  }, []);

  return { users, setUsers, error, setError, isLoading, originalUsers };
};

export default useGetUsers;
