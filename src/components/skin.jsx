import React from 'react'
import { connect } from 'react-redux'
import Dialog from './dialog'
import {changeBackground} from '../actions/background'

class Skin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSkin: false
    }
    this.skinImg = [
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg1.jpg', largeImg: '/assets/img/bg-limg1.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'},
      {thumbImg: '/assets/img/bg-timg0.jpg', largeImg: '/assets/img/bg-limg0.jpg'}
    ]
  }

  handleSkinClose() {
    this.setState({...this.state, showSkin: false})
  }

  handleSkinShow() {
    this.setState({...this.state, showSkin: true})
  }

  handleChange(img) {
    this.props.dispatch(changeBackground(img))
    if(localStorage){
      localStorage.setItem('backgroundImg', img)
    }
    this.handleSkinClose()
  }

  render() {

    return(
      <div onClick={this.handleSkinShow.bind(this)} style={this.props.style}>
        {this.props.children}
        {this.state.showSkin &&
          <Dialog height={177} width={520} onClose={this.handleSkinClose.bind(this)}>
            {this.skinImg.map((img, inx) => {
              return(
                <img src={img.thumbImg} key={inx} style={{cursor: 'pointer', padding: 2, display: 'block', float: 'left'}} width="100" height="55" onClick={() => {this.handleChange(img.largeImg)}} />
              )
            })}
          </Dialog>
        }
      </div>
    )
  }
}

export default connect()(Skin)