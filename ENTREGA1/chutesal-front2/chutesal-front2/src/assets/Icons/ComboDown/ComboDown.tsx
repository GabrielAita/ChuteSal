import { SVGAttributes } from "react";

interface ComboDownProps extends SVGAttributes<HTMLOrSVGElement> {}

export function ComboDown(props: ComboDownProps) {
    return (
        <svg
            width={17}
            height={16}
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M13.003 6l-5 5-5-5"
                stroke="#066"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
