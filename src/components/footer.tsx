import React from "react";
import MaxWidthWrapper from "./ui/max-width-wrapper";
import Text from "./ui/text";
import Link from "next/link";
import { Facebook, Github, Instagram, X, Youtube } from "./icons";

export default function Footer() {
  return (
    <footer className="p-4 md:p-8">
      <MaxWidthWrapper className="flex flex-col items-center gap-4 px-8 md:flex-row md:justify-between md:px-0">
        <Text
          size="text-sm"
          className="text-center leading-5 text-neutral-600 md:hidden"
        >
          Pinsplash,
          <br />
          Inc. All rights reserved.
        </Text>
        <Text
          size="text-sm"
          className="hidden w-full text-start leading-5 text-neutral-600 md:block"
        >
          Pinsplash, Inc. All rights reserved.
        </Text>

        <div className="flex w-full justify-center gap-6 text-neutral-400 md:w-[216px]">
          <Link href="#">
            <Youtube />
          </Link>
          <Link href="#">
            <Instagram />
          </Link>
          <Link href="#">
            <Facebook />
          </Link>
          <Link href="#">
            <Github />
          </Link>
          <Link href="#">
            <X />
          </Link>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
