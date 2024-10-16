"use client";

import Loading from "@/src/components/UI/Loading";
import { useUserSignup } from "@/src/hooks/auth.hook";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { mutate: handleUserSignup, isPending, isSuccess } = useUserSignup();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
    };
    handleUserSignup(userData);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/login");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <div className="grid items-center justify-center my-20 max-w-screen-xl  mx-auto text-center">
        <h1 className="font-bold text-center my-5 text-5xl">Register</h1>
        <p className="mb-5 text-center">Create a new Account</p>
        <div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Input
              isRequired
              type="text"
              label="Name"
              className="max-w-xs mb-2"
              {...register("name")}
            />

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

            {/* <input
            className="block"
            type="file"
            {...register("profilePicture")}
          /> */}

            <Button
              className="mt-4"
              color="primary"
              variant="shadow"
              type="submit"
            >
              Register
            </Button>
          </form>
          <Divider className="my-4" />
          <div>
            <h1 className="my-2">Already have an account?</h1>
            <Link href={"/login"}>
              <Button color="primary" variant="light">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
