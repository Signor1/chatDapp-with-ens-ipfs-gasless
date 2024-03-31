import { getChatContract } from "@/constants/contract";
import { readOnlyProvider, wssProvider } from "@/constants/provider";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

const useGetMessages = (from: string, to: string) => {
  const [messages, setMessages] = useState([]);

  const [numOfMsgs, setNumOfMsgs] = useState(0);

  console.log(numOfMsgs);

  const fetchMessages = useCallback(async () => {
    try {
      const contract = getChatContract(readOnlyProvider);
      const res = await contract.getMessagesBetweenUsers(from, to);
      const converted = res.map((item: [string, string, string]) => ({
        from: item[0],
        to: item[1],
        message: item[2],
      }));
      setMessages(converted);
    } catch (err) {
      console.error(err);
    }
  }, [from, to]);

  const trackingMsgs = useCallback(() => {
    setNumOfMsgs((prevValue) => prevValue + 1);
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    fetchMessages();

    const filter = {
      address: import.meta.env.VITE_CHAT_CONTRACT_ADDRESS,
      topics: [ethers.id("MessageSent(address,address,string)")],
    };

    wssProvider.getLogs({ ...filter, fromBlock: 5601696 }).then((events) => {
      setNumOfMsgs(events.length + 1);
    });

    const provider = new ethers.WebSocketProvider(
      import.meta.env.VITE_WEB_SOCKET_RPC_URL
    );

    provider.on(filter, trackingMsgs);

    return () => {
      // Perform cleanup
      provider.off(filter, trackingMsgs);
    };
  }, [fetchMessages, trackingMsgs]);

  return messages;
};

export default useGetMessages;
