import { useAppSelector } from "../../context/hooks";

const UserInfo: React.FC = () => {

   const {user} = useAppSelector((state) => state.user);
  return (
    <div className="bg-white shadow rounded-xl p-4 w-full">
      <h2 className="text-lg font-semibold mb-2">User Information</h2>
      <p>
        <strong>Name:</strong> {user?.name}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
    </div>
  );
};

export default UserInfo;
