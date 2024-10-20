import { Image } from "@nextui-org/image";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6 md:p-6 ">
      <header className="flex justify-center mb-4">
        <h1 className="text-3xl font-bold text-blue-500">About Us</h1>
      </header>

      <section className="bg-default-100 shadow-md p-4 mb-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-500">
          Company History
        </h2>
        <p className="text-lg text-default-700">
          Founded in 2010, our mission is to provide exceptional car rental
          services to our customers. Our vision is to be the leading car rental
          company in the industry, known for our commitment to customer
          satisfaction and sustainability.
        </p>
      </section>

      <section className="bg-default-100 shadow-md p-4 mb-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-500 text-center">
          Our Team
        </h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-1/2 md:w-1/3 xl:w-1/4 p-4">
            <Image
              alt="Team Member 1"
              className="rounded-full w-24 h-24 mb-2"
              src="https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFufGVufDB8fDB8fHww"
            />
            <h3 className="text-lg font-bold text-default-700">John Doe</h3>
            <p className="text-lg text-default-700">CEO</p>
          </div>
          <div className="w-1/2 md:w-1/3 xl:w-1/4 p-4">
            <Image
              alt="Team Member 2"
              className="rounded-full w-24 h-24 mb-2"
              src="https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
            />
            <h3 className="text-lg font-bold text-default-700">Jane Smith</h3>
            <p className="text-lg text-default-700">Operations Manager</p>
          </div>
          <div className="w-1/2 md:w-1/3 xl:w-1/4 p-4">
            <Image
              alt="Team Member 3"
              className="rounded-full w-24 h-24 mb-2"
              src="https://images.unsplash.com/photo-1558487661-9d4f01e2ad64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
            />
            <h3 className="text-lg font-bold text-default-700">Bob Johnson</h3>
            <p className="text-lg text-default-700">Customer Service Manager</p>
          </div>
          <div className="w-1/2 md:w-1/3 xl:w-1/4 p-4">
            <Image
              alt="Team Member 3"
              className="rounded-full w-24 h-24 mb-2"
              src="https://images.unsplash.com/photo-1556474835-b0f3ac40d4d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
            />
            <h3 className="text-lg font-bold text-default-700">
              Kevin Peterson
            </h3>
            <p className="text-lg text-default-700">Marketing Manager</p>
          </div>
        </div>
      </section>

      <section className="bg-default-100 shadow-md p-4 mb-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-500">Our Fleet</h2>
        <ul className="list-none mb-4">
          <li className="flex items-center mb-2 text-default-700">
            <span>Economy Cars</span>
          </li>
          <li className="flex items-center mb-2 text-default-700">
            <span>Luxury Cars</span>
          </li>
          <li className="flex items-center mb-2 text-default-700">
            <span>SUVs</span>
          </li>
        </ul>
      </section>

      <section className="bg-default-100 shadow-md p-4 mb-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-500">
          Values & Commitment
        </h2>
        <p className="text-lg">
          At our company, we are committed to providing exceptional customer
          service, reducing our environmental impact, and promoting
          sustainability in all aspects of our business.
        </p>
      </section>

      <section className="bg-default-100 shadow-md p-4 mb-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-500">
          Contact Information
        </h2>
        <ul className="list-none mb-4">
          <li className="flex items-center mb-2">
            <i className="fas fa-phone text-lg mr-2" />
            <span>(555) 123-4567</span>
          </li>
          <li className="flex items-center mb-2">
            <i className="fas fa-envelope text-lg mr-2" />
            <span>
              <a href="mailto:info@example.com">info@example.com</a>
            </span>
          </li>
          <li className="flex items-center mb-2">
            <i className="fas fa-map-marker-alt text-lg mr-2" />
            <span>123 Main St, Anytown, USA 12345</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
