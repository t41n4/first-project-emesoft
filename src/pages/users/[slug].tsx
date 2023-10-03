import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {};

const Page = () => {
  const router = useRouter();
  const [slug, setSlug] = useState(router.query.slug);

  useEffect(() => {
    if (!slug) return;
    console.log("slug: ", slug);
  }, [slug]);
  return <div>Page</div>;
};

export default Page;
