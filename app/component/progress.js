import React from 'react';
import './progress.less';


export default class Progress extends React.Component {
	constructor(props){
		super(props);
		this.changeProgress=this.changeProgress.bind(this);
	}
	changeProgress(e){
		let progressBar=this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
		this.props.onProgressChange && this.props.onProgressChange(progress);
	}
    render(){
		return(
			<div className="component-progress row" ref="progressBar"  onClick={this.changeProgress}>
				<div className="progress" style={{width:`${this.props.progress}%`,background:this.props.barColor}}></div>
			</div>		
		);
	}	
}

Progress.defaultProps = {
  barColor:'#2f9842'
};