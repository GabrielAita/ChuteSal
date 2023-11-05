import { SVGAttributes } from "react";

interface CampeonatoNavIconProps extends SVGAttributes<HTMLOrSVGElement> {}

export function CampeonatoNavIcon(props: CampeonatoNavIconProps) {
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
                d="M15.188 3.375H2.812a.563.563 0 00-.562.563v10.124c0 .311.252.563.563.563h12.374c.311 0 .563-.252.563-.563V3.938a.562.562 0 00-.563-.563zM5.344 6.75h7.312M5.344 9h7.312M5.344 11.25h7.312"
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
