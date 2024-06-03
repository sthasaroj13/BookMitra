
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { register } from "@/http/api";
import { LoaderCircle } from "lucide-react";
import useTokenStore from "@/store";

const Register = () => {
    const setToken = useTokenStore((state) => state.setToken)
    // const navigate = useNavigate()
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleregister = () => {
        const name = nameRef.current?.value
        const email = emailRef.current?.value
        const password = passwordRef.current?.value
        // console.log("data", email, password);


        if (!name || !email || !password) {
            return alert('please enter email or password')


        }
        mutation.mutate({ email, password, name })
    }

    // make server  call

    const mutation = useMutation({


        mutationFn: register,
        onSuccess: (data) => {
            console.log(data);



            setToken(data.accessToken);
            //redirect to dash board
            // navigate("/dashboard/home");



        },



    })
    return (
        <div className="flex items-center justify-center min-h-screen py-12 bg-gray-100">
            <div className="flex flex-col ites-center justify-center w-full max-w-md p-8 bg-white shadow-lg h-[27.7rem]">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Sign-Up</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your information to create an account <br />
                        {mutation.error && (
                            <span className="text-red-500 text-sm">Something went wrong !!</span>
                        )}
                    </p>
                </div>
                <div className="w-full grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Name</Label>
                        <Input
                            id="name"
                            type="string"
                            placeholder="name"
                            ref={nameRef}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            ref={emailRef}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>

                        </div>
                        <Input id="password" type="password" ref={passwordRef} required />
                    </div>
                    <Button onClick={handleregister} type="submit" disabled={mutation.isPending} className=" flex items-center gap-3 w-full bg-orange-400 hover:bg-orange-200">
                        {
                            mutation.isPending && (
                                <LoaderCircle className=' animate-spin' />

                            )

                        }


                        <span>Create an account</span>
                    </Button>

                </div>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="underline">
                        Login
                    </Link>
                </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
                <img
                    src="/books.jpg"
                    alt="Image"
                    className="w-[25rem] h-[27.7rem] object-cover "
                />
            </div>
        </div>
    )
}

export default Register
