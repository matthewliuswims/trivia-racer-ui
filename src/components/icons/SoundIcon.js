import React from "react"

// Styled
import { StyledSVG } from "./styled"

const SoundIcon = ({ positionLeft = true }) => {
  return (
    <StyledSVG
      positionLeft
      width="16px"
      height="18px"
      viewBox="0 0 16 18"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="Mobile---Home"
          transform="translate(-27.000000, -29.000000)"
          fill="#FFFFFF"
          fill-rule="nonzero"
        >
          <g id="Header">
            <g id="volume_up-24px" transform="translate(25.000000, 26.000000)">
              <path
                d="M2.5,9 L2.5,15 L5.83333333,15 L10,20 L10,4 L5.83333333,9 L2.5,9 Z M8.33333333,8.83 L8.33333333,15.17 L6.525,13 L4.16666667,13 L4.16666667,11 L6.525,11 L8.33333333,8.83 Z M13.75,12 C13.75,10.23 12.9,8.71 11.6666667,7.97 L11.6666667,16.02 C12.9,15.29 13.75,13.77 13.75,12 Z M11.6666667,3.23 L11.6666667,5.29 C14.075,6.15 15.8333333,8.83 15.8333333,12 C15.8333333,15.17 14.075,17.85 11.6666667,18.71 L11.6666667,20.77 C15.0083333,19.86 17.5,16.28 17.5,12 C17.5,7.72 15.0083333,4.14 11.6666667,3.23 Z"
                id="Shape"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </StyledSVG>
  )
}

export default SoundIcon
