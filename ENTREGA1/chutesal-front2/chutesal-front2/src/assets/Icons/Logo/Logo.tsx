import { SVGAttributes } from "react";

interface LogoProps extends SVGAttributes<HTMLOrSVGElement> {}

export function Logo(props: LogoProps) {
    return (
        <svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M20 36c8.837 0 16-7.163 16-16S28.837 4 20 4 4 11.163 4 20s7.163 16 16 16z"
                stroke="#066"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20.588 12.629a1 1 0 00-1.176 0l-6.234 4.53a1 1 0 00-.364 1.117l2.375 7.344a1 1 0 00.951.692h7.72a1 1 0 00.95-.692l2.376-7.344a1 1 0 00-.364-1.116l-6.234-4.531zM20 10v3.438"
                stroke="#066"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <mask
                id="a"
                maskUnits="userSpaceOnUse"
                x={11.5312}
                y={3.03113}
                width={16}
                height={9}
                fill="#000"
            >
                <path
                    fill="#fff"
                    d="M11.5312 3.03113H27.5312V12.031130000000001H11.5312z"
                />
                <path d="M25.469 6.031L20 10 14.531 6.03" />
            </mask>
            <path
                d="M26.643 7.65a2 2 0 10-2.349-3.238l2.35 3.238zM20 10l-1.175 1.618a2 2 0 002.35 0L20 10zm-4.294-5.588a2 2 0 10-2.35 3.238l2.35-3.238zm8.588 0l-5.469 3.97 2.35 3.236 5.468-3.968-2.349-3.238zm-3.12 3.97l-5.468-3.97-2.35 3.238 5.47 3.968 2.349-3.237z"
                fill="#066"
                mask="url(#a)"
            />
            <path
                d="M10.484 16.906l3.281 1.063"
                stroke="#066"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <mask
                id="b"
                maskUnits="userSpaceOnUse"
                x={2.0155}
                y={7.48425}
                width={11}
                height={16}
                fill="#000"
            >
                <path fill="#fff" d="M2.0155 7.48425H13.0155V23.48425H2.0155z" />
                <path d="M8.406 10.484l2.078 6.422-5.468 3.985" />
            </mask>
            <path
                d="M10.309 9.868A2 2 0 006.503 11.1l3.806-1.232zm.175 7.038l1.178 1.617a2 2 0 00.725-2.233l-1.903.616zm-6.646 2.368a2 2 0 002.355 3.233l-2.355-3.233zM6.503 11.1l2.078 6.422 3.806-1.232-2.078-6.422L6.503 11.1zm2.804 4.19l-5.47 3.984 2.356 3.233 5.469-3.984-2.355-3.233z"
                fill="#066"
                mask="url(#b)"
            />
            <path
                d="M14.125 28.094l2.016-2.782"
                stroke="#066"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <mask
                id="c"
                maskUnits="userSpaceOnUse"
                x={5.35925}
                y={26.0936}
                width={13}
                height={11}
                fill="#000"
            >
                <path
                    fill="#fff"
                    d="M5.35925 26.0936H18.35925V37.093599999999995H5.35925z"
                />
                <path d="M7.36 28.094h6.765l2.094 6.422" />
            </mask>
            <path
                d="M7.36 26.094a2 2 0 000 4v-4zm6.765 2l1.901-.62a2 2 0 00-1.901-1.38v2zm.192 7.041a2 2 0 003.803-1.24l-3.803 1.24zM7.36 30.095h6.766v-4H7.359v4zm4.864-1.38l2.094 6.422 3.803-1.24-2.094-6.422-3.803 1.24z"
                fill="#066"
                mask="url(#c)"
            />
            <path
                d="M25.875 28.094l-2.015-2.782"
                stroke="#066"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <mask
                id="d"
                maskUnits="userSpaceOnUse"
                x={20.7814}
                y={26.0936}
                width={14}
                height={11}
                fill="#000"
            >
                <path
                    fill="#fff"
                    d="M20.7814 26.0936H34.781400000000005V37.093599999999995H20.7814z"
                />
                <path d="M23.781 34.516l2.094-6.422h6.766" />
            </mask>
            <path
                d="M21.88 33.895a2 2 0 003.803 1.24l-3.803-1.24zm3.995-5.801v-2a2 2 0 00-1.901 1.38l1.901.62zm6.766 2a2 2 0 100-4v4zm-6.958 5.041l2.094-6.421-3.803-1.24-2.094 6.421 3.803 1.24zm.192-5.041h6.766v-4h-6.766v4z"
                fill="#066"
                mask="url(#d)"
            />
            <path
                d="M29.516 16.906l-3.281 1.063"
                stroke="#066"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <mask
                id="e"
                maskUnits="userSpaceOnUse"
                x={26.5157}
                y={7.48425}
                width={11}
                height={16}
                fill="#000"
            >
                <path
                    fill="#fff"
                    d="M26.5157 7.48425H37.515699999999995V23.48425H26.5157z"
                />
                <path d="M34.984 20.89l-5.468-3.984 2.078-6.422" />
            </mask>
            <path
                d="M33.807 22.507a2 2 0 002.355-3.233l-2.355 3.233zm-4.291-5.6l-1.903-.617a2 2 0 00.725 2.233l1.178-1.617zm3.98-5.807a2 2 0 10-3.805-1.232l3.806 1.232zm2.666 8.174l-5.468-3.984-2.356 3.233 5.469 3.984 2.355-3.233zm-4.743-1.752l2.078-6.422-3.806-1.232-2.078 6.422 3.806 1.232z"
                fill="#066"
                mask="url(#e)"
            />
        </svg>
    );
}
