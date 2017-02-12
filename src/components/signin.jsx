import React from 'react'

import Dialog from './dialog'

class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  handleShow(e) {
    this.setState({...this.state, show: true})
  }

  handleClose(e) {
    this.setState({...this.state, show: false})
  }

  render() {
    return(
      <div style={this.props.style} onClick={this.handleShow.bind(this)}>
        {this.props.children}
        {
          this.state.show && 
          <Dialog height={300} width={360} onClose={this.handleClose.bind(this)}>
            <div style={{padding: '8px 12px', background: '#ddd', fontSize: 16, fontWeigt: 700}}>会员登录</div>
            <input type="text" placeholder="手机/邮箱/用户名" style={{display: 'block', width: '80%', margin: '15px auto', padding: '8px', fontSize: 14, outline: 0}} />
            <input type="password" placeholder="密码" style={{display: 'block', width: '80%', margin: '15px auto', padding: '8px', fontSize: 14, outline: 0}}/>
          </Dialog>
        }
      </div>
    )
  }
}

export default Signin