import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";

const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-2 px-4">
      <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>
      <p className="mb-8 text-gray-600">
        We&apos;d love to hear from you! Whether you have a question about your
        booking, need assistance, or just want to give us feedback, feel free to
        reach out to us through any of the methods below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <Card className="py-3">
            <CardBody className="flex flex-row items-center space-x-4">
              <div>
                <h2 className="text-lg font-semibold">Phone</h2>
                <p className="text-primary">Call us at: +1 (555) 123-4567</p>
                <p className="text-sm text-gray-500">
                  We&apos;re available 24/7 to assist you.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="py-3">
            <CardBody className="flex flex-row items-center space-x-4">
              <div>
                <h2 className="text-lg font-semibold">Email</h2>
                <p className="text-primary">
                  Send us an email at: support@techmasteryHub.com
                </p>
                <p className="text-sm text-gray-500">
                  We&apos;ll get back to you as soon as possible.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="py-3">
            <CardBody className="flex flex-row items-center space-x-4">
              <div>
                <h2 className="text-lg font-semibold">Visit Us</h2>
                <p>123 TechMasteryHub HQ, San Francisco, CA 94105</p>
                <p className="text-sm text-gray-500">
                  Office hours: Mon-Fri, 9 AM - 6 PM
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Contact Form</h2>

              <Input
                className="mb-2"
                label="Your Name"
                placeholder="Enter your name"
                variant="bordered"
              />
              <Input
                className="mb-2"
                label="Your Email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Textarea
                className="mb-2"
                label="Your Message"
                minRows={4}
                placeholder="Enter your message"
                variant="bordered"
              />
              <Button className="w-full" color="primary" type="submit">
                Send Message
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Our Location</h2>
        <Card>
          <CardBody className="p-0 h-[400px]">
            <iframe
              allowFullScreen={false}
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977600296347!2d-122.41941708468212!3d37.77492997975892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1652384760244!5m2!1sen!2sus"
              style={{ border: 0 }}
              title="TechMasteryHub Location"
              width="100%"
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
