import UserService, { UserT } from "./services/user-service";
import useGetUsers from "./hooks/useGetUsers";
export default function VanillaCustomHook() {
  const { users, setUsers, error, setError, isLoading, originalUsers } =
    useGetUsers();

  const deleteUser = (id: number) => {
    const filteredUsers = users.filter((u) => u.id !== id);
    setUsers(filteredUsers);
    UserService.deleteEntity(id).catch((err) => {
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
    UserService.addEntity<UserT>(newUser)
      .then((res) => setUsers([res.data, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

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
