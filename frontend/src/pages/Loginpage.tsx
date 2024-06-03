import React, { useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/http/api";
import { LoaderCircle } from "lucide-react";
import useTokenStore from "@/store";

const Loginpage = () => {
    const navigate = useNavigate();
    const setToken = useTokenStore((state) => state.setToken);
    const setUserId = useTokenStore((state) => state.setUserId);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            return alert('Please enter email and password');
        }

        mutation.mutate({ email, password });
    };

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log(data);

            setToken(data.token);
            setUserId(data.userId);





        },
        onError: (err) => {
            console.log(err);



        }
    });

    return (
        <div className="flex items-center justify-center min-h-screen py-12 bg-gray-100">
            <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white shadow-lg h-[27.7rem]">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your email below to login to your account <br />
                        {mutation.error && (
                            <span className="text-red-500 text-sm">{mutation.error.message}</span>
                        )}
                    </p>
                </div>
                <div className="w-full grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            ref={emailRef}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" ref={passwordRef} required />
                    </div>
                    <Button onClick={handleLogin} type="submit" disabled={mutation.isPending} className="flex items-center gap-3 w-full bg-orange-400 hover:bg-orange-600">
                        {mutation.isPending && <LoaderCircle className='animate-spin' />}
                        <span>Login</span>
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/auth/sign-up" className="underline">
                        Sign up
                    </Link>
                </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
                <img src="/books.jpg" alt="Image" className="w-[25rem] h-[27.7rem] object-cover" />
            </div>
        </div>
    );
};

export default Loginpage;
