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
      <input value={this.props.value} name={this.props.name} type={this.props.type} id={this.props.id} placeholder={this.props.placeholder} style={{display: 'block', width: '80%', margin: '15px auto', padding: '8px', fontSize: 14, outline: 0, border: border, lineHeight: '20px', ...this.props.style}} onMouseLeave={this.handleLeave.bind(this)} onMouseEnter={this.handleEnter.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} />
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
    let disabled = null
    if(this.props.disabled)
      disabled = {disabled: true}

    return(
      <input {...disabled} type="submit" value={this.props.value} style={{display: 'block', textAlign: 'center', fontSize: 16, lineHeight: '30px', height: 30, width: '80%', margin: '30px auto', border: 'none', outline: 0, padding: 8, boxSizing: 'content-box', cursor: 'pointer', background: bgColor, borderRadius: 3, color: '#fff', fontWeight: 700}} onMouseLeave={this.handleLeave.bind(this)} onMouseEnter={this.handleEnter.bind(this)}/>
    )
  }
}

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      errorText: '',
      signuping: false
    }
  }

  handleMount() {
    ReactDOM.findDOMNode(this.refs.userName).focus()
  }

  handleShow(e) {
    this.setState({...this.state, show: true})
  }

  handleClose(e) {
    if(this.state.signuping)
      return
    this.setState({...this.state, show: false})
  }

  handleSigninShow() {
    this.setState({...this.state, show: false})
  }

  handleSubmit(e) {
    e.preventDefault()
    if(this.state.signuping)
      return
    let signData = {}
    const _this = this
    signData.userName = ReactDOM.findDOMNode(this.refs.userName).value
    signData.password = ReactDOM.findDOMNode(this.refs.password).value
    signData.phone = ReactDOM.findDOMNode(this.refs.phone).value
    signData.qq = ReactDOM.findDOMNode(this.refs.qq).value

    this.setState({...this.state, errorText: '正在注册，请稍等。', signuping: true})

    fetch('/signup', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signData)
    }).then(res => {
      res.json().then(json => {
        if(json.error){
          _this.setState({..._this.state, errorText: json.msg, signuping: false})
          return
        }
        _this.setState({..._this.state, errorText: '', signuping: false, show: false})
        alert('注册成功')
      })
    }).catch(err => {
      _this.setState({..._this.state, errorText: '服务器错误，请稍后再试。', signuping: false})
    })
    
  }

  render() {

    return(
      <div style={this.props.style} onClick={this.handleShow.bind(this)}>
        {this.props.children}
        {
          this.state.show && 
          <Dialog height={400} width={400} onClose={this.handleClose.bind(this)} componentDidMount={this.handleMount.bind(this)}>
            <div style={{padding: '8px 12px', background: '#ddd', fontSize: 16, fontWeigt: 700}}>会员注册</div>
            <form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
              {this.state.errorText &&
                <p style={{fontSize: 14, margin: '10px', color: '#ec5840'}}>{this.state.errorText}</p>
              }
              <div style={{height: 38, margin: 15}}>
                <label htmlFor="signup_username" style={{float: 'left', width: 70, lineHeight: '38px', textAlign: 'right', cursor: 'default'}}>用户名：</label>
                <Input id="signup_username" ref="userName" type="text" placeholder="请设置用户名" style={{margin: 0, float: 'left', width: 270}} />
              </div>
              <div style={{height: 38, margin: 15}}>
                <label htmlFor="signup_password" style={{float: 'left', width: 70, lineHeight: '38px', textAlign: 'right', cursor: 'default'}}>密码：</label>
                <Input id="signup_password" ref="password" type="password" placeholder="请设置登录密码" style={{margin: 0, float: 'left', width: 270}} />
              </div>
              <div style={{height: 38, margin: 15}}>
                <label htmlFor="signup_phone" style={{float: 'left', width: 70, lineHeight: '38px', textAlign: 'right', cursor: 'default'}}>手机号：</label>
                <Input id="signup_phone" ref="phone" type="text" placeholder="可用于登录和找回密码" style={{margin: 0, float: 'left', width: 270}} />
              </div>
              <div style={{height: 38, margin: 15}}>
                <label htmlFor="signup_qq" style={{float: 'left', width: 70, lineHeight: '38px', textAlign: 'right', cursor: 'default'}}>Q Q：</label>
                <Input id="signup_qq" ref="qq" type="text" placeholder="可选填写QQ号" style={{margin: 0, float: 'left', width: 270}} />
              </div>
              <Submit disabled={this.state.signuping} value="注册"/>
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
      show: false,
      errorText: '',
      siginining: false
    }
  }

  handleMount() {
    ReactDOM.findDOMNode(this.refs.userName).focus()
  }

  handleShow(e) {
    this.setState({...this.state, show: true})
  }

  handleClose(e) {
    if(this.state.siginining)
      return
    this.setState({...this.state, show: false})
  }

  handleSubmit(e) {
    e.preventDefault()
    if(this.state.siginining)
      return

    let _this = this
    let userName = ReactDOM.findDOMNode(this.refs.userName).value
    let password = ReactDOM.findDOMNode(this.refs.password).value

    this.setState({...this.state, errorText: '正在登录，请稍等。', siginining: true})

    fetch('/signin', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userName, password})
    }).then(res => {
      res.json().then(json => {
        if(json.error){
          _this.setState({..._this.state, errorText: json.msg, siginining: false})
          return
        }
        //_this.setState({..._this.state, errorText: '', siginining: false, show: false})
        location.reload()
      })
    }).catch(err => {
      _this.setState({..._this.state, errorText: '服务器错误，请稍后再试。', siginining: false})
    })
  }

  render() {
    return(
      <div style={this.props.style} onClick={this.handleShow.bind(this)}>
        {this.props.children}
        {
          this.state.show && 
          <Dialog height={300} width={360} onClose={this.handleClose.bind(this)} componentDidMount={this.handleMount.bind(this)}>
            <div style={{padding: '8px 12px', background: '#ddd', fontSize: 16, fontWeigt: 700}}>会员登录</div>
            <form onSubmit={this.handleSubmit.bind(this)}>
              {this.state.errorText &&
                <p style={{fontSize: 14, margin: '10px', color: '#ec5840'}}>{this.state.errorText}</p>
              }
              <Input ref="userName" type="text" placeholder="手机/用户名" />
              <Input ref="password" type="password" placeholder="密码" />
              <Submit disabled={this.state.signuping} value="登录"/>
            </form>
          </Dialog>
        }
      </div>
    )
  }
}

export {Signin, Signup}