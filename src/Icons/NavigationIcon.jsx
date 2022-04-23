import * as React from "react"
import Svg, { Path } from "react-native-svg"

const NavigationIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="#fff"
        {...props}
    >
        <Path d="M10.8 6.2C6.5 7.9 3 9.8 3 10.6c0 .7 1.5 1.8 3.4 2.5 2.3.8 3.7 2.2 4.5 4.5.7 1.9 1.8 3.4 2.5 3.4C14.5 21 21 6.4 21 3.9c0-1.4-1.8-1-10.2 2.3z" />
    </Svg>
)

export default NavigationIcon
