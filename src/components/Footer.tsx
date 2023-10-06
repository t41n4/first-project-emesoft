const Footer = () => {
  return (
    <footer className="shadow bg-[#f58439] mx-10 w-[95vw] rounded-lg border border-black">
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
