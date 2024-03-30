/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { readOnlyProvider } from "@/constants/provider";
import { getENSContract } from "@/constants/contract";

export const useCheckUser = (address: any) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const contract = getENSContract(readOnlyProvider);

    contract
      .getUserFromAddress(address)
      .then((res) => {
        const converted = {
          name: res[0],
          avatar: res[1],
          address: res[2],
        };

        setUser(converted);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [address]);

  return user;
};
