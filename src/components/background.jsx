import React from 'react'

export default class Background extends React.Component {

	render() {

		return(
			<div style={{position: 'absolute', zIndex: -1, top: 0, left: 0, height: '100%', width: '100%', background: 'url("assets/img/bg-img0.jpg") no-repeat', backgroundSize: 'cover'}} />
		)
	}
}