"use client";
import React, { useState } from "react";
import { CompleteLogo, Logo, Search } from "./icons";
import Link from "next/link";
import { Input } from "./ui/input";
import MaxWidthWrapper from "./ui/max-width-wrapper";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search.trim())}`);
    }
  };

  const handleSearchClick = () => {
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="p-4 md:px-8">
      <MaxWidthWrapper className="flex items-center justify-between gap-4 py-3 lg:gap-6">
        <Link href="/" className="md:hidden">
          <Logo />
        </Link>
        <Link href="/" className="hidden md:block">
          <CompleteLogo />
        </Link>

        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Input
            placeholder="Search image Eg. Landscape"
            value={search}
            onChange={handleSearchChange}
          />
          <button
            type="button"
            onClick={handleSearchClick}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 transform"
          >
            <Search />
          </button>
        </form>
      </MaxWidthWrapper>
    </header>
  );
}
