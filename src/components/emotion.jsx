import React from 'react'
import ReactDOM from 'react-dom'

import RenderToLayer from './internal/RenderToLayer'

class Emotion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEm: false,
      boxBottom: 0,
      boxRight: 0
    }
    this.el = null
  }

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this)
  }

  componentDidUpdate() {
    if(!this.state.showEm)
      return
    const rect = this.el.getBoundingClientRect()
    const winHeight = window.innerHeight|| documentElement.clientHeight|| body.clientHeight
    const winWidth = window.innerWidth || documentElement.clientWidth || body.clientWidth
    const bottom = winHeight - rect.top
    const right = winWidth - rect.left - (rect.right - rect.left) / 2 - 100
    if(bottom != this.state.boxBottom || right != this.state.boxRight){
      this.setState({...this.state, boxRight: right, boxBottom: bottom})
    }
  }

  handleOpen(e) {
    this.setState({...this.state, showEm: true})
  }

  handleClose(e) {
    this.setState({...this.state, showEm: false})
  }

  render() {
    return(
      <div style={this.props.style} onClick={this.handleOpen.bind(this)}>
        {this.props.children}
        {
          this.state.showEm && this.state.boxBottom > 0 && this.state.boxRight > 0 &&
          <div style={{content: '', clear: 'both', display: 'table'}}>
            <RenderToLayer componentClickAway={this.handleClose.bind(this)}>
              <div style={{position: 'absolute', zIndex: 10, background: '#fff', height: 200, width: 200, right: this.state.boxRight, bottom: this.state.boxBottom}}>表情</div>
            </RenderToLayer>
          </div>
        }
      </div>
    )
  }
}

export default Emotion