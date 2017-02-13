import React from 'react'
import ReactDOM from 'react-dom'

import Dialog from './dialog'

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hoverd: false,
      focus: false
    }
  }

  handleLeave(e) {
    this.setState({...this.state, hoverd: false})
  }

  handleEnter(e) {
    this.setState({...this.state, hoverd: true})
  }

  handleFocus(e) {
    this.setState({...this.state, focus: true})
  }

  handleBlur(e) {
    this.setState({...this.state, focus: false})
  }

  render() {
    let border = '1px solid #D7D7D7'
    if(this.state.hoverd)
      border = '1px solid #999'
    if(this.state.focus)
      border = '1px solid #2795dc'
    return(
      <input type={this.props.type} id={this.props.id} placeholder={this.props.placeholder} style={{display: 'block', width: '80%', margin: '15px auto', padding: '8px', fontSize: 14, outline: 0, border: border, ...this.props.style}} onMouseLeave={this.handleLeave.bind(this)} onMouseEnter={this.handleEnter.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} />
    )
  }
}

class Submit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hoverd: false
    }
  }

  handleLeave(e) {
    this.setState({...this.state, hoverd: false})
  }

  handleEnter(e) {
    this.setState({...this.state, hoverd: true})
  }

  render() {
    let bgColor = '#3f89ec'
    if(this.state.hoverd)
      bgColor = '#4490f7'
    return(
      <input type="submit" value={this.props.value} style={{display: 'block', textAlign: 'center', fontSize: 16, lineHeight: '30px', height: 30, width: '80%', margin: '30px auto', border: 'none', outline: 0, padding: 8, boxSizing: 'content-box', cursor: 'pointer', background: bgColor, borderRadius: 3, color: '#fff', fontWeight: 700}} onMouseLeave={this.handleLeave.bind(this)} onMouseEnter={this.handleEnter.bind(this)}/>
    )
  }
}

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  handleMount() {
    ReactDOM.findDOMNode(this.refs.userName).focus()
  }

  handleShow(e) {
    this.setState({...this.state, show: true})
  }

  handleClose(e) {
    this.setState({...this.state, show: false})
  }

  handleSigninShow() {
    this.setState({...this.state, show: false})
  }

  render() {
    return(
      <div style={this.props.style} onClick={this.handleShow.bind(this)}>
        {this.props.children}
        {
          this.state.show && 
          <Dialog height={400} width={400} onClose={this.handleClose.bind(this)} componentDidMount={this.handleMount.bind(this)}>
            <div style={{padding: '8px 12px', background: '#ddd', fontSize: 16, fontWeigt: 700}}>会员注册</div>
            <form>
              <div style={{height: 38, margin: 15}}>
                <label htmlFor="signup_username" style={{float: 'left', width: 70, lineHeight: '38px', textAlign: 'right', cursor: 'default'}}>用户名：</label>
                <Input id="signup_username" ref="userName" type="text" placeholder="请设置用户名" style={{margin: 0, float: 'left', width: 270}} />
              </div>
              <div style={{height: 38, margin: 15}}>
                <label style={{float: 'left', width: 70, lineHeight: '38px', textAlign: 'right', cursor: 'default'}}>密码：</label>
                <Input type="password" placeholder="请设置登录密码" style={{margin: 0, float: 'left', width: 270}} />
              </div>
              <div style={{height: 38, margin: 15}}>
                <label style={{float: 'left', width: 70, lineHeight: '38px', textAlign: 'right', cursor: 'default'}}>手机号：</label>
                <Input type="text" placeholder="可用于登录和找回密码" style={{margin: 0, float: 'left', width: 270}} />
              </div>
              <div style={{height: 38, margin: 15}}>
                <label style={{float: 'left', width: 70, lineHeight: '38px', textAlign: 'right', cursor: 'default'}}>Q Q：</label>
                <Input type="text" placeholder="可选填写QQ号" style={{margin: 0, float: 'left', width: 270}} />
              </div>
              <Submit value="注册"/>
            </form>
          </Dialog>
        }
      </div>
    )
  }
}

class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  handleMount() {
    ReactDOM.findDOMNode(this.refs.userName).focus()
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
          <Dialog height={300} width={360} onClose={this.handleClose.bind(this)} componentDidMount={this.handleMount.bind(this)}>
            <div style={{padding: '8px 12px', background: '#ddd', fontSize: 16, fontWeigt: 700}}>会员登录</div>
            <form autoComplete="off">
              <Input ref="userName" type="text" placeholder="手机/邮箱/用户名" />
              <Input type="password" placeholder="密码" />
              <Submit value="登录"/>
            </form>
          </Dialog>
        }
      </div>
    )
  }
}

export {Signin, Signup}