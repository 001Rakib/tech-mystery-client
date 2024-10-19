"use client";
import { useUser } from "@/src/context/user.provider";
import { useMakePayment } from "@/src/hooks/payment.hook";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useEffect, useState } from "react";

const Pricing = () => {
  const { user } = useUser();

  const { mutate: payment, data, isPending, isSuccess } = useMakePayment();
  const [redirectUrl, setRedirectUrl] = useState(null);

  const handlePayment = async () => {
    const paymentData = {
      id: user?._id,
      name: user?.name,
      email: user?.email,
      totalCost: Number(20),
    };

    await payment(paymentData);
  };

  useEffect(() => {
    if (isSuccess && data?.success) {
      setRedirectUrl(data?.data?.payment_url);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  return (
    <>
      <div className="flex justify-center items-center my-10">
        <Card className="max-w-md">
          <CardHeader>
            <h2 className="text-2xl font-bold">Subscribe Premium Content</h2>
          </CardHeader>
          <CardBody>
            <h3 className="text-xl font-semibold">$20 / month</h3>
            <p>Includes all Premium Content</p>
          </CardBody>
          <CardFooter>
            <Button isLoading={isPending} onClick={() => handlePayment()}>
              Subscribe
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Pricing;
