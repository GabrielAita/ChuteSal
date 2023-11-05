import * as React from "react"
import {SVGAttributes} from "react";

export interface TrophyIconProps extends SVGAttributes<HTMLOrSVGElement> {}

export function TrophyFirstIcon(props: TrophyIconProps) {
    return (
        <svg
            width={31}
            height={31}
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M6.73 6.73v6.623c0 4.771 3.823 8.725 8.594 8.761a8.65 8.65 0 008.05-5.328 8.65 8.65 0 00.664-3.325V6.73a.962.962 0 00-.962-.962H7.692a.961.961 0 00-.961.961zM11.538 26.922h7.692M15.384 22.114v4.808"
                stroke="#B8B8B8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M23.821 15.384h1.178a3.846 3.846 0 003.846-3.846V9.615a.962.962 0 00-.962-.961h-3.846M6.971 15.384H5.757a3.846 3.846 0 01-3.846-3.846V9.615a.961.961 0 01.962-.961h3.846"
                stroke="#B8B8B8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
