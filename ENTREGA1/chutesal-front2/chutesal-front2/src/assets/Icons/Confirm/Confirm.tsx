import * as React from "react"

interface EditProps extends React.SVGAttributes<HTMLOrSVGElement> {}


export const Confirm = (props: EditProps) => {
  return (
    <svg
      width={32}
      height={33}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27 9.412l-14 14-7-7"
        stroke="#066"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
