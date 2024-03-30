import { useEffect, useState } from "react";
import { readOnlyProvider } from "@/constants/provider";
import { getENSContract } from "@/constants/contract";

export const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const contract = getENSContract(readOnlyProvider);

    contract
      .getAllUsers()
      .then((res) => {
        const converted = res.map((item: [string, string, string]) => ({
          name: item[0],
          avatar: item[1] || "",
          address: item[2],
        }));

        setAllUsers(converted);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return allUsers;
};
