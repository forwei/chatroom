import React, {PropTypes} from 'react'
import RenderToLayer from './internal/RenderToLayer'

export default class Dialog extends React.Component {

	static propTypes = {
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired
	}

	handleClose(e) {
		this.props.onClose && this.props.onClose(e)
	}

	stopClick(e) {
		e.stopPropagation()
		e.preventDefault()
	}

	render() {

		let width = this.props.width
		let height = this.props.height

		return(
			<div style={{content: '', clear: 'both', display: 'table'}}>
			<RenderToLayer>
			<div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000}} onClick={this.stopClick.bind(this)}>
				<div style={{zIndex: 1020, position: 'absolute', width: width, height: height, top: '50%', left: '50%', marginTop: -height/2, marginLeft: -width/2, backgroundColor: '#fff', borderRadius: 3, boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 45px, rgba(0, 0, 0, 0.2) 0px 10px 18px', color: '#333', overflow: 'hidden'}}>
					<div style={{height: this.props.height, width: this.props.width}}>
					{this.props.children}
					</div>
				</div>
				<div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1010, backgroundColor: 'rgba(0, 0, 0, 0.3)'}} onClick={this.handleClose.bind(this)} />
			</div>
			</RenderToLayer>
			</div>
		)
	}
}