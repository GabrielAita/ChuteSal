import { SVGAttributes } from "react";

interface TimeNavIconProps extends SVGAttributes<HTMLOrSVGElement> {}

export function TimeNavIcon(props: TimeNavIconProps) {
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
                d="M5.625 14.063a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM2.25 15.75a4.218 4.218 0 016.75 0M5.625 6.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM2.25 8.438a4.219 4.219 0 016.75 0M12.375 14.063a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM9 15.75a4.218 4.218 0 016.75 0M12.375 6.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM9 8.438a4.219 4.219 0 016.75 0"
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
