import { Camera, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import useCreateUser from "@/hooks/useCreateUser";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

export default function Form() {
  const { address } = useWeb3ModalAccount();

  const [selectedFile, setSelectedFile] = useState();

  const [username, setUsername] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectImage = ({ target }: { target: any }) => {
    setSelectedFile(target.files[0]);
  };

  const getImage = useCallback(async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile!);

        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
              pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
            },
          }
        );

        const fileUrl = response.data.IpfsHash;
        setUrl(fileUrl);
        console.log(fileUrl);
        return fileUrl;
      } catch (error) {
        console.log("Pinata API Error:", error);
      }
    }
  }, [selectedFile]);

  getImage()

  const handleSubmit = useCreateUser(address, url, username);

  const handleClick = async () => {
    setIsLoading(true);
    await handleSubmit();
    setIsLoading(false);
  };

  return (
    <div className="flex items-center flex-1 justify-center w-full">
      <div className="w-full max-w-sm bg-stone-900 rounded-lg px-7 py-12 flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          hidden
          className="hidden"
          id="selectFile"
          onChange={handleSelectImage}
        />
        <label
          htmlFor="selectFile"
          className="rounded-full w-32 h-32 bg-stone-700 flex items-center justify-center cursor-pointer">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="relative flex w-16 h-16">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-cyan-400 opacity-85"></span>
              <Camera className="w-16 h-16 relative inline-flex rounded-full text-muted-foreground" />
            </span>

          )}
        </label>

        <form

          className="flex flex-col my-4 w-full gap-4">
          <div className="space-y-2">
            <label className="text-sm">Username</label>
            <Input className="border border-stone-100 py-2 placeholder:text-stone-500" placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">IPFS url</label>
            <Input className="border border-stone-100 py-2 placeholder:text-stone-500"
              value={url} readOnly placeholder="Select an image and await IPFS url..."
            />
          </div>

          <Button type="button" disabled={url === ""} onClick={handleClick} className="bg-gradient-to-r disabled:cursor-not-allowed from-cyan-400 via-purple-400 to-pink-400">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Registering User...
              </>
            ) : (
              "Register User"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
