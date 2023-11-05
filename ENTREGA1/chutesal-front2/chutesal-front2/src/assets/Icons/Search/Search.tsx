import { SVGAttributes } from "react";

interface SearchProps extends SVGAttributes<HTMLOrSVGElement> {}

export function Search(props: SearchProps) {
    return (
        <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M7.25 12.5a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5zM10.963 10.963L14 14"
                stroke="#066"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
