"use client";
import React, { useEffect, useState, useTransition } from "react";
import { CompleteLogo, Logo, Search } from "./icons";
import Link from "next/link";
import { Input } from "./ui/input";
import MaxWidthWrapper from "./ui/max-width-wrapper";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState<string>("");
  const [, startTransition] = useTransition();

  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(window.location.search);

      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      } else {
        params.delete("search");
      }
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, [debouncedSearch, pathname, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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

        <div className="relative w-full">
          <Input
            placeholder="Search image Eg. Landscape"
            value={search}
            onChange={handleSearchChange}
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 transform" />
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
