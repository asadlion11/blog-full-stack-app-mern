import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })
    
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    
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
            const {data} = await axios.post('/api/register-user', formData)
            // console.log(data)
            toast.success("Sucesfully registered")
            setLoading(false)
            navigate('/login')
            
        } catch (err) {
            setLoading(false)
            toast.error(err.response.data)
        }
    }

  return (
    <div className='w-full'>
    <Card>
  <CardHeader>
    <CardTitle>Register With Your Info</CardTitle>
    <CardDescription>Register With Your Info</CardDescription>
  </CardHeader>
  <CardContent>
  <form onSubmit = {handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter Your Username" onChange = {handleInputChange}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter Your Email" onChange = {handleInputChange}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="passwod">Password</Label>
              <Input id="password" placeholder="Enter Your Password" type = "password" onChange = {handleInputChange}/>
            </div>
            <Button>{loading ? 'Registering' : "Register"}</Button>
          </div>
        </form>
  </CardContent>
</Card>
</div>

  )
}

export default Register