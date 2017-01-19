import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class Background extends React.Component {

	static propTypes = {
		backgroundUrl: PropTypes.string.isRequired
	}

	render() {

		return(
			<div style={{position: 'absolute', zIndex: -1, top: 0, left: 0, height: '100%', width: '100%', background: 'url("' + this.props.backgroundUrl + '") no-repeat', backgroundSize: 'cover'}} />
		)
	}
}

const mapStateToProps = state => {

	return {
		backgroundUrl: state.background
	}
}

export default connect(mapStateToProps)(Background)