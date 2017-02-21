import React from 'react'
import { connect } from 'react-redux'
import Skin from './skin'
import {Signin, Signup} from './sign'

import notifi from './notification'


class InfoPanel extends React.Component {

	constructor(props) {
		super(props)
		this.state = {

		}
	}

	handleNotifi() {
		notifi.open({
			message: 'Notification Title',
			description: 'This is :' + Math.random().toString().substr(2),
			duration: 3,
			onClose: () => {console.log('close')}
		})
	}

	render() {

		return(
			<div style={{height: 260}}>
				<div style={{textAlign: 'center', paddingTop: 20, paddingBottom: 5}}>
					<img src="http://li.zhiboqiwang88.com/themes/v2/static/images/17yk.png" width="100" />
				</div>
				<h4 style={{color: '#fff', textAlign: 'center'}}>{this.props.account.userLevel == 0 ? '游客' + this.props.account.name : this.props.account.name}</h4>
				<div>
					<Skin style={{color: '#fff', display: 'inline-block', cursor: 'pointer', marginRight: 10}}>换肤</Skin>
					<Signin style={{color: '#fff', display: 'inline-block', cursor: 'pointer', marginRight: 10}}>登录</Signin>
					<a style={{color: '#fff', display: 'inline-block', cursor: 'pointer', marginRight: 10}} href="/signout">登出</a>
					<a style={{color: '#fff', display: 'inline-block', cursor: 'pointer', marginRight: 10}} href="javascript:;" onClick={this.handleNotifi.bind(this)}>提示</a>
					<Signup style={{color: '#fff', display: 'inline-block', cursor: 'pointer'}}>注册</Signup>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		account: state.account
	}
}

export default connect(mapStateToProps)(InfoPanel)