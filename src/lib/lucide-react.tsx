"use client";

import { forwardRef } from "react";
import type { SVGProps } from "react";

export const CheckCircle2 = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ strokeWidth = 2, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 12a10 10 0 1 1-10-10 10 10 0 0 1 10 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
);

CheckCircle2.displayName = "CheckCircle2";
