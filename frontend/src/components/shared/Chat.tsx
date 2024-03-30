import { cn } from "@/lib/utils";

export default function Chat({
  mine,
  message,
  avatar
}: {
  mine: boolean;
  message: string;
  avatar: string
}) {
  return (
    <div
      className={cn("flex gap-3 justify-start w-full", {
        "flex-row-reverse": mine,
      })}>
      {!mine && (
        <div className="w-10 h-10 bg-secondary overflow-hidden rounded-full hidden md:flex">
          <img src={`https://beige-urban-takin-227.mypinata.cloud/ipfs/${avatar}`} alt="Avatar" className="w-full h-full" />
        </div>
      )}
      <div
        className={cn("w-max max-w-xl h-max bg-secondary rounded-xl", {
          "bg-primary": mine,
        })}>
        <p className="text-sm px-3 py-[10px]">{message}</p>
      </div>
    </div>
  );
}
