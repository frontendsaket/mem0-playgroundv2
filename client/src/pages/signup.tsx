import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import GlobalContext from "@/context/GlobalContext"
import { Link, useNavigate } from "react-router-dom"

const url = import.meta.env.VITE_URL;

export default function Signup() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const { logged } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(logged) navigate("/");
    else if(localStorage.getItem("auth-token")) navigate("/")
  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    const response = await fetch(`${url}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: email,
            password: password,
            name: name
          }
        ),
      });

    const data = await response.json();

    if(data.success){
        navigate("/login")
    }else{
        // ss
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register with just a username.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userid">User Id</Label>
              <Input
                id="userid"
                type="text"
                placeholder="saket"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userid">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Saket Aryan"
                value={email}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Register</Button>
          </CardFooter>
        </form>
        <h1 className="text-center mb-6 font-semibold text-[14px]">Already a user? <Link className="text-blue-600 underline" to="/login">Login</Link></h1>
      </Card>
    </div>
  )
}