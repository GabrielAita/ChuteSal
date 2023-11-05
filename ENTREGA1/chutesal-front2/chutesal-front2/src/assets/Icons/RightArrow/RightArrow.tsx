import { SVGAttributes } from "react";

interface RightArrowProps extends SVGAttributes<HTMLOrSVGElement> {
    stroke?: string;

    
}

export function RightArrow({stroke,  ...props}: RightArrowProps) {
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
                d="M12 6l10 10-10 10"
                stroke={stroke || "#066"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
