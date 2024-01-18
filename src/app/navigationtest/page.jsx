"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const NavigationTestPage = () => {
  //! CLIENT SIDE NAVIGATION
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  console.log("query => ", q);

  console.log("Pathname => ", pathName);

  const handleClick = () => {
    console.log("clicked!");
    router.push("/");
  };

  return (
    <div>
      <Link href={"/"} prefetch={false}>
        Click Here
      </Link>
      <button onClick={handleClick}>Write and Redirect</button>
    </div>
  );
};

export default NavigationTestPage;
