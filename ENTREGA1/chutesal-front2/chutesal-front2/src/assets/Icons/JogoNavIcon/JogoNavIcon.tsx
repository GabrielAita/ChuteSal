import { SVGAttributes } from "react";

interface JogoNavIconProps extends SVGAttributes<HTMLOrSVGElement> {}

export function JogoNavIcon(props: JogoNavIconProps) {
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
                d="M9 15.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z"
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 6.047L6.195 8.086l1.068 3.305h3.474l1.069-3.305L9 6.046zM9 4.5v1.547M11.46 2.714L9 4.5 6.54 2.714M4.718 7.608l1.477.478M3.783 4.718l.935 2.89L2.258 9.4M6.356 12.642l.907-1.251M3.312 12.642h3.044l.942 2.89M11.644 12.642l-.907-1.251M10.702 15.532l.942-2.89h3.044M13.282 7.608l-1.477.478M15.743 9.4l-2.461-1.792.935-2.89"
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
