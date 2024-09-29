import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useUser } from "@/hooks/useUser"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'


const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    
  const navigate = useNavigate()

  const { login, user } = useUser()

  useEffect(() => {
    if(user) navigate('/')
  },[user])

    const [loading, setLoading] = useState(false)

    
    
    const handleInputChange = (event) => {
        // console.log(event.target.value)
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()

        try {
            const { data } = await axios.post('/api/user/login', formData)
            console.log(data)
            toast.success("Sucesfully login")
            setLoading(false)
            login(data, data.expiresIn)
            navigate('/')
            
        } catch (err) {
            setLoading(false)
            toast.error(err.response.data)
            console.log(err)
        }
    }

  return (
    <div className='w-full'>
    <Card>
  <CardHeader>
    <CardTitle>Login With Your Info</CardTitle>
    <CardDescription>Login With Your Info</CardDescription>
  </CardHeader>
  <CardContent>
  <form onSubmit = {handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter Your Email" required onChange = {handleInputChange}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="passwod">Password</Label>
              <Input id="password" placeholder="Enter Your Password" required type = "password" onChange = {handleInputChange}/>
            </div>
            <Button>{loading ? 'Loading' : "Login"}</Button>
          </div>
        </form>
  </CardContent>
</Card>
</div>

  )
}

export default Login