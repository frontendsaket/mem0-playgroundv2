import { Button } from "./ui/button"


const Menu = () => {
  return (
    <>
     <nav className="w-64 bg-gray-50/50 py-4 flex-shrink-0 border-r-2 border-gray-200">
        <ul>
          <li className="mb-1"><Button variant="ghost" className="w-full justify-start hover:bg-indigo-100">Dashboard</Button></li>
          <li className="mb-1"><Button variant="ghost" className="w-full justify-start hover:bg-indigo-100">Users</Button></li>
          <li className="mb-1"><Button variant="ghost" className="w-full justify-start bg-indigo-100 hover:bg-indigo-100">Playground</Button></li>
        </ul>
      </nav>
    </>
  )
}

export default Menu