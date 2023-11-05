

import {SVGAttributes} from "react";


interface LoginSvgProps extends SVGAttributes<HTMLOrSVGElement> {}

export function LoginIcon (props : LoginSvgProps ) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.734 6.047L10.688 9l-2.954 2.953M2.813 9h7.874"
        stroke="#066"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.688 2.813h3.937a.562.562 0 01.563.562v11.25a.562.562 0 01-.563.563h-3.938"
        stroke="#066"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}


export {}