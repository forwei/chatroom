import React, {PropTypes} from 'react'


export default class DragBar extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			showMask: false,
			hovered: false
		}
		this.movePiexl = 0
		this.setup = 8
	}

	static propTypes = {
		onDrag: PropTypes.func.isRequired
	}

	handleMouseEnter(e) {
		if(this.movePiexl > 0)
			return
		this.setState({...this.state, hovered: true})
	}

	handleMouseLeave(e) {
		if(this.movePiexl > 0)
			return
		this.setState({...this.state, hovered: false})
	}

	handleMouseDown(e) {
		this.movePiexl = e.clientX
		this.setState({...this.state, showMask: true})
	}

	handleMouseUp(e) {
		this.movePiexl = 0
		this.setState({hovered: false, showMask: false})
	}

	handleMouseMove(e){
		let nowX = e.clientX
		let moveSetup = this.movePiexl > nowX ? this.movePiexl - nowX : nowX - this.movePiexl
		if(moveSetup > this.setup){
			moveSetup = this.movePiexl > nowX ? -moveSetup : moveSetup
			this.props.onDrag(moveSetup)
			this.movePiexl = nowX
		}
	}

	render() {

		let wrapStyle = {...this.props.style}
		if(this.state.hovered) {
			wrapStyle.background = 'rgba(0,0,0,0.5)'
		}

		return(
			<div style={wrapStyle} onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
				{this.state.showMask &&
				<div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2000}} onMouseMove={this.handleMouseMove.bind(this)} />
				}
			</div>
		)
	}
}