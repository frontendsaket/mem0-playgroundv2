import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between align-middle px-6 py-2 bg-gray-50/50 border-b border-gray-200">
      <Link to="/" className="my-auto">
        <img className="my-auto w-28" src="light.svg" alt="mem0 logo" />
      </Link>
      <div className="my-auto flex gap-10">
        <h1 className="my-auto font-medium">Docs</h1>
        <Avatar>
          <AvatarImage src="avatar.jpg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
