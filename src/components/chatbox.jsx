import React from 'react'


export default class ChatBox extends React.Component {

	render() {

		return(
			<div style={{height: 150, backgroundColor: '#FFF'}}>
				<div style={{height: 35, lineHeight: '35px', padding: 8}}>
					高级客服：
				</div>
				<div style={{height: 37, lineHeight: '37px', backgroundColor: 'rgb(243,243,243)', padding: '0 8px'}}>
					<span>表情 </span><span> 图片</span>
				</div>
				<div style={{height: 62, position: 'relative', paddingRight: 120}}>
					<input type="text" style={{display: 'block', border: 'none', height: '100%', padding: '0px 10px', width: '100%', fontSize: 18, outline: 'none'}} placeholder="在这儿说点什么。。。"/>
					<a style={{position: 'absolute', top: 0, right: 0, width: 100, height: 62, textAlign: 'center', lineHeight: '62px', background: '#ccc', fontSize: 20}} href="javascript:;">发 送</a>
				</div>
			</div>
		)
	}
}