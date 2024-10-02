import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import GlobalContext from "@/context/GlobalContext"
import { useNavigate } from "react-router-dom"

const url = import.meta.env.VITE_URL;

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { logged, setLogged } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(logged) navigate("/");
    else if(localStorage.getItem("auth-token")) navigate("/")
  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    const response = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: email,
            password: password}
        ),
      });

    const data = await response.json();

    if(data.success){
        localStorage.setItem("auth-token", data.authtoken);
        setLogged(true);
        navigate("/")
    }else{
        // ss
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
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
            <Button type="submit" className="w-full">Log in</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}