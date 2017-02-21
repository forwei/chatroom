import React from 'react'
import ReactDom from 'react-dom'

class Notice extends React.Component {

  componentDidMount() {
    this.clearCloseTimer()
    if (this.props.duration) {
      this.closeTimer = setTimeout(() => {
        this.close()
      }, this.props.duration * 1000)
    }
  }

  componentWillUnmount() {
    this.clearCloseTimer()
  }

  close() {
    this.clearCloseTimer()
    this.props.onClose()
  }

  clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer)
      this.closeTimer = null
    }
  }

  render() {

    return(
      <div onClick={this.close.bind(this)}>
        {this.props.children}
      </div>
    )
  }
}

class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notices: []
    }
  }

  add(notice) {
    let key = notice.key = notice.key || Math.random().toString().substr(2)
    let notices = this.state.notices
    if (!notices.filter(v => {
      return v.key === key
    }).length) {
      this.setState({
        notices: notices.concat(notice)
      })
    }
  }

  remove(key) {
    let notices = this.state.notices.filter((notice) => {
      return notice.key !== key
    })
    this.setState({
      notices: notices
    })
  }

  render() {
    let noticeNodes = this.state.notices.map((notice) => {
      let onClose = () => {
        this.remove(notice.key)
        notice.onClose()
      }
      return(
        <Notice key={notice.key} onClose={onClose} duration={notice.duration}>{notice.content}</Notice>
      )
    })

    return(
      <div style={{position: 'fixed', right: 8, top: 30, width: '20%', display: this.state.notices.length ? 'block' : 'none'}}>
        {noticeNodes}
      </div>
    )
  }
}
Notification.newInstance = (properties) => {
  let props = properties || {}
  let div = document.createElement('div')
  document.body.appendChild(div)
  let notification = ReactDom.render(React.createElement(Notification, props), div)
  return {
    notice: (noticeProps) => {
      notification.add(noticeProps)
    }
  }
}


let notificationInstance = Notification.newInstance({style: {height: 10}})

function notice(args) {

  let duration = args.duration || 0 == args.duration ? args.duration : 2

  notificationInstance.notice({
    content: (
      <div style={{marginBottom:10, padding: 10, borderRadius: 4, background: '#fff', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.2)', lineHeight: 1.5, cursor: 'pointer'}}>
        <div style={{paddingRight: 25}}>{args.message}</div>
        <div style={{fontSize: 12}}>{args.description}</div>
        {args.btn ? <span>{args.btn}</span> : null}
      </div>
    ),
    duration,
    onClose: args.onClose,
    key: args.key,
    style: {}
  })
}

export interface ArgsProps {
  message: React.ReactNode;
  description: React.ReactNode;
  btn?: React.ReactNode;
  key?: string;
  onClose?: () => void;
  duration?: number;
}

const api = {
  open(args: ArgsProps) {
    notice(args)
  }
}

export default api