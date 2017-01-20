import React, {PropTypes} from 'react'


export default class Dialog extends React.Component {

	static propTypes = {
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
		onClose: PropTypes.func.isRequired
	}

	render() {

		return(
			<div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000}}>
				<div style={{zIndex: 1020, position: 'absolute', width: this.props.width, height: this.props.height, top: '50%', left: '50%', marginTop: -this.props.height/2, marginLeft: -this.props.width/2, backgroundColor: '#fff', borderRadius: 3, boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 45px, rgba(0, 0, 0, 0.2) 0px 10px 18px', color: '#333', overflow: 'hidden'}}>
					{this.props.children}
				</div>
				<div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1010, backgroundColor: 'rgba(0, 0, 0, 0.3)'}} onClick={this.props.onClose} />
			</div>
		)
	}
}