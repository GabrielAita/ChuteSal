import { SVGAttributes } from "react";

interface InscritoNavIconProps extends SVGAttributes<HTMLOrSVGElement> {}

export function InscritoNavIcon(props: InscritoNavIconProps) {
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
                d="M9.563 10.125a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM2.25 7.594h1.688M2.25 4.781h1.688M2.25 10.406h1.688M2.25 13.219h1.688M6.188 11.813a4.218 4.218 0 016.75 0"
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.188 15.188V2.812a.562.562 0 00-.563-.562H4.5a.563.563 0 00-.563.563v12.374c0 .311.252.563.563.563h10.125c.31 0 .563-.252.563-.563z"
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
