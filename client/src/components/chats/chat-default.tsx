import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const ChatDefault = (props: { name: string }) => {
  return (
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
          👋 Hi there! I'm mem0.ai, your personal assistant. How can I help you today? 😊
        </p>
        <p className="bg-gray-200/40 rounded-bl-none p-3 rounded-lg">
          Here are a few things you can ask me:
        </p>
        <ul className="bg-gray-200/40 rounded-bl-none p-3 rounded-lg list-none pl-4">
          <li>- 📝 Remember my name is {props.name}.</li>
          <li>- 🌇 I live in San Francisco.</li>
          <li>- ❓ What is my name?</li>
          <li>- 🏡 Where do I live?</li>
          <li>- 🤔 What do you remember about me?</li>
        </ul>
        <p className="bg-gray-200/40 rounded-bl-none p-3 rounded-lg">
          Go ahead, ask me anything! Let's make your experience extraordinary. 🌟
        </p>
      </div>
    </div>
  );
};

export default ChatDefault;
