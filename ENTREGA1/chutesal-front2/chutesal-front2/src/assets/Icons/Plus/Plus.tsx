import { SVGAttributes } from "react";

interface PlusProps extends SVGAttributes<HTMLOrSVGElement> {}

export function Plus(props: PlusProps) {
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
                d="M2.813 9h12.374M9 2.813v12.374"
                stroke="#066"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
