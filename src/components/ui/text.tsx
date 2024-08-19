import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type TextSize =
  | "text-xs"
  | "text-sm"
  | "text-base"
  | "text-xl"
  | "text-2xl"
  | "text-3xl"
  | "text-4xl";

type TextProps<T extends React.ElementType> = {
  children: React.ReactNode;
  size?: TextSize;
  as?: T;
  className?: string;
} & React.ComponentPropsWithoutRef<T> &
  VariantProps<typeof textStyles>;

const textStyles = cva(["font-normal text-[#030712]"], {
  variants: {
    size: {
      "text-xs": "text-xs leading-4 text-[#030712]",
      "text-sm": "text-sm leading-5 text-[#030712]",
      "text-base": "text-base leading-6 text-[#030712]",
      "text-xl": "text-xl leading-7 text-[#030712]",
      "text-2xl": "text-2xl leading-8 text-[#030712]",
      "text-3xl": "text-3xl leading-9 text-[#030712]",
      "text-4xl": "text-4xl font-medium leading-10 text-[#030712]",
    },
  },
  defaultVariants: {
    size: "text-base",
  },
});

export default function Text<T extends React.ElementType = "p">({
  children,
  className,
  size,
  as,
  ...rest
}: TextProps<T>) {
  const Component = as || "p";
  return (
    <Component className={cn(textStyles({ size }), className)} {...rest}>
      {children}
    </Component>
  );
}
