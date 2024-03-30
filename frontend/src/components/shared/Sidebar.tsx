
import { Link } from "react-router-dom";

export default function Sidebar({ currentUser, listOfUsers }: { currentUser: { name: string, avatar: string, address: string }, listOfUsers: { name: string, avatar: string, address: string }[] }) {

  // console.log(currentUser);
  return (
    <div className="lg:w-[350px] md:w-[300px] w-[250px] p-6 flex border-r border-stone-100/40 flex-col gap-2">

      <h1 className="py-3 text-stone-100">Current User</h1>
      {
        currentUser && (
          <div className="flex p-3 items-center gap-4 bg-stone-900  rounded-lg border border-stone-500/80 hover:border-purple-400/60">
            <div className="rounded-full w-10 h-10 overflow-hidden bg-secondary">
              <img src={`https://beige-urban-takin-227.mypinata.cloud/ipfs/${currentUser.avatar}`} alt={currentUser.name} className="w-full h-full" />
            </div>
            <h1>{currentUser.name}</h1>
          </div>
        )
      }

      <h1 className="py-3 text-stone-100">List of Users</h1>
      <div className="flex flex-col gap-2 overflow-y-auto">
        {listOfUsers && listOfUsers.map((user: { name: string, avatar: string, address: string }, index: number) => (
          <Link to={`/chat/${user.address}`}
            key={index}
            className="flex cursor-pointer p-3 items-center gap-4 bg-stone-900  rounded-lg border border-stone-500/80 hover:border-purple-400/60">
            <div className="rounded-full w-10 h-10 overflow-hidden bg-secondary">
              <img src={`https://beige-urban-takin-227.mypinata.cloud/ipfs/${user.avatar}`} alt={user.name} className="w-full h-full" />
            </div>
            <h1>{user.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
