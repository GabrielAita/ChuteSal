import * as React from "react"

interface DisabledCalendarProps extends React.SVGAttributes<HTMLOrSVGElement> {}


export function DisabledCalendar(props : DisabledCalendarProps) {
  return (
    <svg
      width={14}
      height={15}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.425 2.088H1.544c-.3 0-.544.244-.544.544v10.88c0 .301.244.545.544.545h10.88c.301 0 .545-.244.545-.544V2.633c0-.301-.244-.545-.544-.545zM10.248 1v2.176M3.72 1v2.176M1 5.352h11.969M8.617 8.073l-3.265 3.264M8.617 11.337L5.351 8.073"
        stroke="#545454"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}