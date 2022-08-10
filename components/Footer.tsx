import Image from "next/image";
import React from "react";

type FooterProps = {};

function Footer({}: FooterProps) {
  return (
    <div className="flex flex-col mt-20 text-black max-w-[1320px] items-center justify-center mx-auto">
      <div className="relative h-16 w-16 flex-shrink-0 items-center mb-6">
        <Image objectFit="contain" src="/logo.svg" layout="fill" />
      </div>
      <p>Make something awesome</p>
    </div>
  );
}

export default Footer;
