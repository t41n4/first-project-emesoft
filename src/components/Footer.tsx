const Footer = () => {
  return (
    <footer className="bg-[#e4e6e7] shadow px-4 w-full border border-black fixed  bottom-0 left-0 right-0">
      <div className=" mx-auto max-w-screen-xl py-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-black sm:text-center">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Emesoft™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-black sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
