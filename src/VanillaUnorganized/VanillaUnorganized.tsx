import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
type UserT = {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
};
export default function VanillaUnorganized() {
  const [users, setUsers] = useState<UserT[]>([]);
  const [originalUsers, setOriginalUsers] = useState<UserT[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const deleteUser = (id: number) => {
    const filteredUsers = users.filter((u) => u.id !== id);
    setUsers(filteredUsers);
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const newUser: UserT = {
      email: "abc",
      id: 0,
      name: "Zlabia",
      phone: "912-3-127-312",
      username: "zlabia_1",
    };
    setUsers([newUser, ...users]);
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((res) => setUsers([res.data, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios
      .get<UserT[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
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
    return () => controller.abort();
  }, []);

  return (
    <>
      <h1 className="center">Vanilla ! </h1>
      <button className="btn large" onClick={addUser}>
        Add User ✅
      </button>
      {error && <h1 className="red">{error}</h1>}
      {isLoading && <h1 className="green">Loading ...</h1>}
      <ul>
        {users.map(({ id, name }) => (
          <li key={id} className="table">
            {name}
            <button className="btn" onClick={() => deleteUser(id)}>
              Delete ❌
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
