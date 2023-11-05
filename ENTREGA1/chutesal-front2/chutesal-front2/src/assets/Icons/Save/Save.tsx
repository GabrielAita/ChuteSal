import { SVGAttributes } from "react";

interface SaveProps extends SVGAttributes<HTMLOrSVGElement> {
  stroke?: string;
}

export function Save({ stroke, ...props }: SaveProps) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.875 7.133v9.117a.624.624 0 01-.625.625H3.75a.625.625 0 01-.625-.625V3.75a.625.625 0 01.625-.625h9.117a.617.617 0 01.438.18l3.39 3.39a.616.616 0 01.18.438v0z"
        stroke={stroke || "#B8B8B8"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 16.875v-5a.625.625 0 01.625-.625h6.25a.624.624 0 01.625.625v5M11.875 5.625H7.5"
        stroke={stroke || "#B8B8B8"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
