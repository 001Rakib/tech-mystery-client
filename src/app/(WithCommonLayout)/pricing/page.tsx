import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React from "react";

const Pricing = () => {
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
            <Button>Subscribe</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Pricing;
