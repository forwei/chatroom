import React from 'react'
import ReactDOM from 'react-dom'

import RenderToLayer from './internal/RenderToLayer'
import emotion from '../utils/emotion'

class Face extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hovered: false
    }
    this.isGif = props.img.toLowerCase().indexOf('.gif') > -1 ? true : false
  }

  componentDidMount() {
    this.drawImage()
  }

  componentDidUpdate() {
    this.drawImage()
  }

  drawImage() {
    if(this.state.hovered || !this.isGif)
      return
    let imgcan = ReactDOM.findDOMNode(this.refs.imgcan)
    imgcan.width = imgcan.height = 22
    let img = ReactDOM.findDOMNode(this.refs.img)

    if(img.complete)
      imgcan.getContext('2d').drawImage(img, 0, 0, 22, 22)
    else{
      img.onload = () => {
        imgcan.getContext('2d').drawImage(img, 0, 0, 22, 22)
      }
    }
  }

  handleMouseEnter(e) {
    this.setState({...this.state, hovered: true})
  }

  handleMouseLeave(e) {
    this.setState({...this.state, hovered: false})
  }

  handleClick(e) {
    this.props.faceClick(this.props.name)
  }

  render() {

    let display = 'none'
    if(!this.isGif || this.state.hovered) {
      display = 'block'
    }

    return(
      <div style={{float: 'left', padding: 5, cursor: 'pointer', background: this.state.hovered ? '#ddd' : '#fff'}} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.handleClick.bind(this)} title={this.props.name}>
        <img ref="img" style={{display: display}} src={this.props.img} width="22" height="22" />
        {this.isGif && display == 'none' &&
        <canvas ref="imgcan" style={{display: 'block', height: 22, width: 22}} />
        }
      </div>
    )
  }
}

class Emotion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEm: false,
      boxBottom: 0,
      boxRight: 0
    }
    this.el = null
    this.emotions = emotion.getEmotions()
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
    const right = winWidth - rect.left - (rect.right - rect.left) / 2 - 240
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

  handleFaceClick(name) {
    this.props.selectFace(name)
  }

  render() {

    let faces = new Array()
    if(this.state.showEm) {
      for(let i = 0; this.emotions.length > i && i < 90; i++){
        faces.push(<Face key={i} img={this.emotions[i].icon} name={this.emotions[i].name} faceClick={this.handleFaceClick.bind(this)}/>)
      }
    }

    return(
      <div style={this.props.style} onClick={this.handleOpen.bind(this)}>
        {this.props.children}
        {
          this.state.showEm && this.state.boxBottom > 0 && this.state.boxRight > 0 &&
          <div style={{content: '', clear: 'both', display: 'table'}}>
            <RenderToLayer componentClickAway={this.handleClose.bind(this)}>
              <div style={{position: 'absolute', zIndex: 10, background: '#fff', height: 192, width: 480, right: this.state.boxRight, bottom: this.state.boxBottom, boxShadow: 'rgba(0, 0, 0, 0.3) 0px 14px 45px, rgba(0, 0, 0, 0.2) 0px 10px 18px', overflow: 'hidden'}}>
                  {faces}
              </div>
            </RenderToLayer>
          </div>
        }
      </div>
    )
  }
}

export default Emotion