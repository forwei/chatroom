import React from 'react'

import { connect } from 'react-redux'


class InfoPanel extends React.Component {

	render() {

		return(
			<div style={{height: 260}}>
				<div style={{textAlign: 'center', paddingTop: 20, paddingBottom: 15}}>
					<img src="http://li.zhiboqiwang88.com/themes/v2/static/images/17yk.png" width="100" />
				</div>
				<h4 style={{color: '#fff', textAlign: 'center'}}>{this.props.account.userLevel == 0 ? '游客' + this.props.account.name : this.props.account.name}</h4>
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