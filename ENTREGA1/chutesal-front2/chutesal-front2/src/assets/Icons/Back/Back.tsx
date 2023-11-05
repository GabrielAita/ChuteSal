import { SVGAttributes } from "react";

interface BackProps extends SVGAttributes<HTMLOrSVGElement> {}

export function Back(props: BackProps) {
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
                d="M11.25 14.625L5.625 9l5.625-5.625"
                stroke="#066"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
