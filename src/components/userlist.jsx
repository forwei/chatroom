import React, {PropTypes} from 'react'
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import ScrollArea from './scrollarea'

class UserItem extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			hovered: false
		}
  }

	handleMouseLeave(event) {
		this.setState({hovered: false})
	}

	handleMouseEnter(event) {
		this.setState({hovered: true})
	}

	handleClick(event){
		this.props.onClick(this.props.inx)
	}

	render() {

		const styles = getStyles(this.state)

		return (
			<div 
			onMouseLeave={this.handleMouseLeave.bind(this)}
			onMouseEnter={this.handleMouseEnter.bind(this)}
			onClick={this.handleClick.bind(this)}
			style={styles.item}>
			<span>游客{this.props.name}</span></div>
		)
	}
}

class UserList extends React.Component{

	static propTypes = {
		allUsers: PropTypes.array.isRequired
	}

	constructor(props) {
		super(props)
		this.state = {
//			users: [123, 234, 4356, 456]
		}
  }

  addUser(event) {
//  	if(this.refs.val.value)
//  		this.setState({users: [...this.state.users, this.refs.val.value]})
  }

  removeUser(inx){
//  	this.state.users.splice(inx, 1)
//  	this.setState(this.state)
  }

	render() {

		const styles = getStyles(null, this.props)

		return (
			<div id="userlist" style={styles.root}>
				<div style={styles.headwrap}>
					<span>在线会员</span>
				</div>
				<div style={{height: 30, background: 'rgba(0,0,0,0.3)'}}>
					<input ref="val" type="text" style={styles.searchbtn} />
					<span onClick={this.addUser.bind(this)}>搜索</span>
				</div>
				<div style={{height: this.props.height - 25 - 32, overflow: 'hidden'}}>
					<ScrollArea itemHeight={35} height={this.props.height - 25 - 32}>
					{
						this.props.allUsers.map((user, inx) => {
							return <UserItem key={inx} name={user.name} inx={inx} onClick={this.removeUser.bind(this)} />
						})
					}
					</ScrollArea>
				</div>
			</div>
		)
	}
	componentDidMount() {

  }
}

const mapStateToProps = state => {
	return {
		allUsers: state.user
	}
}
export default connect(mapStateToProps)(UserList)

function getStyles(state, props) {

	return {
		root: {
			background: 'rgba(0, 0, 0, 0.2)',
			color: '#fff',
			height: props && props.height
		},
		item: {
			cursor: 'pointer',
			height: 35,
			lineHeight: '35px',
			transition: 'background-color 300ms',
			background: state && state.hovered ? 'rgba(0, 0, 0, 0.2)' : null
		},
		headwrap: {
			borderBottom: 'rgba(255,255,255,0.3) 1px solid',
			height: 31,
			lineHeight: '31px',
			paddingLeft: 5
		},
		searchbtn: {
			border: 'none',
			background: 'none',
			height: 30,
			lineHeight: '30px',
			outline: 0,
			marginLeft: '5px',
			color: '#fff'
		}
	}
}