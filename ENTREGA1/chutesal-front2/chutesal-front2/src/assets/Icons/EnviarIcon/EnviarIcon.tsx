import {SVGAttributes} from "react";

interface EnviarIconProps extends SVGAttributes<HTMLOrSVGElement> {}

export function EnviarIcon(props: EnviarIconProps) {
    return (
        <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M16.43 2.805L1.867 6.906a.625.625 0 00-.094 1.172l6.688 3.164c.13.06.236.166.297.297l3.164 6.688a.625.625 0 001.172-.094L17.195 3.57a.616.616 0 00-.765-.765v0zM8.664 11.336l3.531-3.531"
                stroke="#066"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
