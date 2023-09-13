const Page = async () => {
 await new Promise((resolve) => setTimeout(resolve,1000))
  return <div>
    Hello
  </div>;
};

export default Page;
