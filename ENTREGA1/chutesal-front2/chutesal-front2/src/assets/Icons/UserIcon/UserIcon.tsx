import {SVGAttributes} from "react";


interface UserIconProps extends SVGAttributes<HTMLOrSVGElement> {}

export function UserIcon(props: UserIconProps) {
    return (
        <svg
            width={22}
            height={12}
            viewBox="0 0 22 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M6.328 7.375a3.437 3.437 0 100-6.875 3.437 3.437 0 000 6.875zM12.516 1.875h8.25M12.516 6h8.25M14.578 10.125h6.188M1 11.5a5.5 5.5 0 0110.656 0"
                stroke="#066"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
