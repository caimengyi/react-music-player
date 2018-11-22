import React from 'react';
import './musiclistitem.less';


export default class MusicListItem extends React.Component {
	render(){
		let musicItem = this.props.musicItem;
		return(
			<li className={`component-musiclistitem ${this.props.focus ? 'focus' : ''}`}>
				<p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
				<p className="delete"></p>
			</li>
		)

	}

}