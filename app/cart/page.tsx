const Page = async () => {
 await new Promise((resolve) => setTimeout(resolve,1000))
  return <div>
    Hello from cart 
  </div>;
};

export default Page;
