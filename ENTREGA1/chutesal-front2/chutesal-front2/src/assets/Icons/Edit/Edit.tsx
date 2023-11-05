import { SVGAttributes } from "react";

interface EditProps extends SVGAttributes<HTMLOrSVGElement> {}

export function Edit(props: EditProps) {
    return (
        <svg
            width={25}
            height={25}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12.5 15.625H9.375V12.5l9.375-9.375 3.125 3.125-9.375 9.375zM16.406 5.469l3.125 3.125"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M21.094 11.719v8.594a.781.781 0 01-.782.78H4.688a.781.781 0 01-.78-.78V4.688a.781.781 0 01.78-.782h8.594"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
