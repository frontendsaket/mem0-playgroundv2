import { ChatPairInterface } from "@/types/chat-type";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const ChatPair = (props: { item: ChatPairInterface }) => {
  return (
    <>
      <div className="flex items-center justify-end text-sm">
        <p className="bg-gray-200/40 p-3 rounded-lg">{props.item.question}</p>
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
          <p className="bg-gray-200/40 rounded-bl-none p-3 rounded-lg">
            {props.item.answer}
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatPair;
