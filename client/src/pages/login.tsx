import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import GlobalContext from "@/context/GlobalContext"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

const url = import.meta.env.VITE_URL;

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { logged, setLogged, setProgress } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(logged) navigate("/");
    else if(localStorage.getItem("auth-token")) navigate("/")
  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProgress(40);
    // Handle login logic here
    const response = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: email,
            password: password}
        ),
      });
    setProgress(60);
    const data = await response.json();
    setProgress(100);
    if(data.success){
        localStorage.setItem("auth-token", data.authtoken);
        setLogged(true);
        navigate("/")
    }else{
        toast(data.error);
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
        <h1 className="text-center mb-6 font-semibold text-[14px]">New? <Link className="text-blue-600 underline" to="/signup">SignUp</Link></h1>
      </Card>
    </div>
  )
}