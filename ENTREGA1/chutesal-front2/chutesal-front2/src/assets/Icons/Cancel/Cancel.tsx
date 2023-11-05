import * as React from "react";

interface CancelProps extends React.SVGAttributes<HTMLOrSVGElement> {}

export const Cancel = (props: CancelProps) => {
  return (
    <svg
      width={33}
      height={32}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M25.56 7l-18 18M25.56 25l-18-18"
        stroke="#066"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
