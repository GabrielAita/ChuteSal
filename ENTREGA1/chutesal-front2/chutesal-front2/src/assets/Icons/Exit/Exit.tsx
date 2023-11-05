import { SVGAttributes } from "react";

interface ExitProps extends SVGAttributes<HTMLOrSVGElement> {}

export function Exit(props: ExitProps) {
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
                d="M5.766 11.953L2.812 9l2.954-2.953M10.688 9H2.811M10.688 2.813h3.937a.562.562 0 01.563.562v11.25a.562.562 0 01-.563.563h-3.938"
                stroke="#066"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
