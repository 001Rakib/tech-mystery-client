"use client";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useUserLogin } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/user.provider";
import Loading from "@/src/components/UI/Loading";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const router = useRouter();

  const { setIsLoading } = useUser();

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    await handleUserLogin(data);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/");
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <Loading />}

      <div className="grid items-center justify-center my-20 max-w-screen-xl  mx-auto text-center">
        <h1 className="font-bold text-center my-2 text-5xl">Login</h1>
        <p className="mb-5 text-center">
          Enter your email and password to login
        </p>
        <div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Input
              isRequired
              className="max-w-xs"
              errorMessage="Please enter a valid email"
              label="Email"
              type="email"
              {...register("email")}
            />
            <Input
              isRequired
              className="max-w-xs"
              errorMessage="Incorrect password"
              label="Password"
              type="password"
              {...register("password")}
            />
            <Button
              className="mt-4"
              color="primary"
              type="submit"
              variant="shadow"
            >
              Login
            </Button>
          </form>
          <Divider className="my-4" />
          <div>
            <h1 className="my-2">Don&apos;t have any account?</h1>
            <Link href={"/register"}>
              <Button color="primary" variant="light">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
