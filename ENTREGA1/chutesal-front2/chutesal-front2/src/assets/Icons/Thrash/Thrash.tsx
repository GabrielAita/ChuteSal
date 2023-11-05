import { SVGAttributes } from "react";

interface ThrashProps extends SVGAttributes<HTMLOrSVGElement> {
    stroke?: string;
}

export function Thrash(props: ThrashProps) {
    return (
        <svg
            width={26}
            height={25}
            viewBox="0 0 26 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M21.188 5.469H4M10.25 10.156v6.25M14.938 10.156v6.25M19.625 5.469v14.843a.78.78 0 01-.781.782h-12.5a.781.781 0 01-.782-.782V5.47"
                stroke={props.stroke ? props.stroke : "#B8B8B8"}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.5 5.469V3.906a1.563 1.563 0 00-1.563-1.562H10.25a1.562 1.562 0 00-1.563 1.562V5.47"
                stroke={props.stroke ? props.stroke : "#B8B8B8"}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
