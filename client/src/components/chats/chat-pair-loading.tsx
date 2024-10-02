import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const ChatPairLoading = (props: { question: string }) => {
  return (
    <>
      <div className="flex items-center justify-end text-sm">
        <p className="bg-gray-200/40 p-3 rounded-lg">{props.question}</p>
        <div className="w-8 h-8 mx-4 rounded-full overflow-hidden">
          <Avatar>
            <AvatarImage src="avatar.jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex my-8 items-center">
        <div className="w-1/12">
          <div className="w-8 h-8 mr-2 rounded-full overflow-hidden">
            <Avatar>
              <AvatarImage src="mem0_logo.jpeg" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="max-w-11/12 text-sm">
          <div className="bg-gray-200/40 flex gap-1 rounded-bl-none p-3 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-gray-500/80 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-gray-500/60 animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPairLoading;
