"use client";

import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const searchParams = useSearchParams();
  const { register, handleSubmit } = useForm();
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const { setIsLoading } = useUser();

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    await handleUserLogin(data);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <div className="grid items-center justify-center my-20 max-w-screen-xl  mx-auto text-center">
      <h1 className="font-bold text-center my-2 text-5xl">Login</h1>
      <p className="mb-5 text-center">Enter your email and password to login</p>
      <div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            isRequired
            type="email"
            label="Email"
            className="max-w-xs"
            errorMessage="Please enter a valid email"
            {...register("email")}
          />
          <Input
            isRequired
            type="password"
            label="Password"
            className="max-w-xs"
            errorMessage="Incorrect password"
            {...register("password")}
          />
          <Button
            className="mt-4"
            color="primary"
            variant="shadow"
            type="submit"
          >
            Login
          </Button>
        </form>
        <Divider className="my-4" />
        <div>
          <h1 className="my-2">Don't have any account?</h1>
          <Link href={"/register"}>
            <Button color="primary" variant="light">
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
