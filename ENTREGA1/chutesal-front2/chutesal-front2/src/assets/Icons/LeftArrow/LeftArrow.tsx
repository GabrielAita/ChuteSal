import { SVGAttributes } from "react";

interface LeftArrowProps extends SVGAttributes<HTMLOrSVGElement> {}

export function LeftArrow(props: LeftArrowProps) {
    return (
        <svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M20 26L10 16 20 6"
                stroke="#066"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
