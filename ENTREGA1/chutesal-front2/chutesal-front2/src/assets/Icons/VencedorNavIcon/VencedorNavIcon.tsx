import { SVGAttributes } from "react";

interface VencedorNavIconProps extends SVGAttributes<HTMLOrSVGElement> {}

export function VencedorNavIcon(props: VencedorNavIconProps) {
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
                d="M3.171 13.781a.57.57 0 00.703.415 19.195 19.195 0 0110.245 0 .57.57 0 00.703-.415l1.793-7.615a.562.562 0 00-.774-.646l-3.557 1.582a.57.57 0 01-.725-.24L9.492 3.137a.563.563 0 00-.984 0L6.44 6.863a.57.57 0 01-.725.239L2.16 5.52a.563.563 0 00-.774.646l1.786 7.615z"
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
