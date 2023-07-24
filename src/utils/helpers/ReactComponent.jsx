import React from "react"

export const getReactComponent = (content='', tag='div', properties={}) => {
    return React.createElement(
        tag,
        properties,
        content
    )
};