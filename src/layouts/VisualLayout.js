import React from 'react'
import 'antd/dist/antd.css'

class VisualLayout extends React.Component {
    render() {
        return <div> {this.props.children}</div>
    }
}

export default VisualLayout