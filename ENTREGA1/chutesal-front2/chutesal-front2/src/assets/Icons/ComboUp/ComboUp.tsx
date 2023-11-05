import { SVGAttributes } from "react";

interface ComboUpProps extends SVGAttributes<HTMLOrSVGElement> {}

export function ComboUp(props: ComboUpProps) {
    return (
        <svg
            width={17}
            height={17}
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M3.524 10.467l5-5 5 5"
                stroke="#066"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
