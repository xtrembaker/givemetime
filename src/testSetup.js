import React from 'react'
import TestUtils from 'react-addons-test-utils'

export default function (initialProps) {
    return function setup (classToRender, propsOverride) {
        const props = Object.assign(initialProps, propsOverride)

        const renderer = TestUtils.createRenderer()
        renderer.render(React.createElement(classToRender, props))
        const output = renderer.getRenderOutput()

        return {
            props,
            output,
            renderer,
        }
    }
}