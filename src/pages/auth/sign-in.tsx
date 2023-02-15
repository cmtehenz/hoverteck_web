import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";



export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn,  user } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate('/dashboard/home')
    }
  }, [user])
  

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try{
      await signIn({email, password});
    }catch(e: any){
      setError(e.message);
    }
  
  }
  
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Input 
                type="email" 
                label="Email" 
                size="lg" 
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input 
                type="password" 
                label="Password" 
                size="lg"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)} 

              />
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button 
                variant="gradient" 
                type="submit"
                fullWidth>
                Sign In
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don't have an account?
                <Link to="/auth/sign-up">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign up
                  </Typography>
                  {error && <p>{error}</p>}
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;