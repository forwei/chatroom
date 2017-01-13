import React from 'react'
import ReactDOM from "react-dom"
import './userlist.css'

export default class UserList extends React.Component{
	constructor(props) {
		super(props)

  }
	render() {
		return (
			<div className="userlist">
				<div className="head">
					<span>在线会员</span>
				</div>
				<div className="tool">
					<input type="text" id="usearch" />
					<span>在线</span>
				</div>
				<div className="listwrap">
					<ul>
						<li><span>游客98206128</span></li>
						<li><span>游客98206128</span></li>
						<li><span>游客98206128</span></li>
						<li><span>游客98206128</span></li>
						<li><span>游客98206128</span></li>
					</ul>
				</div>
			</div>
		)
	}
	componentDidMount() {

  }
}