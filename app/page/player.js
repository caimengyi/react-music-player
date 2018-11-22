import React from 'react';
import Progress from '../component/progress';
import './player.less'


let duration = null;
export default class Player extends React.Component {
	constructor(props){
		super(props);
		this.state={
			progress:0,
			volume:0,
			isPlay:true
		};
		this.progressChangeHandler=this.progressChangeHandler.bind(this);
		this.VolumeChangeHandler=this.VolumeChangeHandler.bind(this);
		this.play=this.play.bind(this);

	}

	componentDidMount(){
		$("#player").bind($.jPlayer.event.timeupdate,(e)=> {
			duration = e.jPlayer.status.duration;
			this.setState({
				volume:e.jPlayer.options.volume*100,
				progress:e.jPlayer.status.currentPercentAbsolute
			});

		});
	}

	componentWillUnmount(){
		$("#player").unbind($.jPlayer.event.timeupdate);
	}

	progressChangeHandler(progress){
		$("#player").jPlayer('play',duration*progress);
	}

	VolumeChangeHandler(progress){
		$("#player").jPlayer('volume',progress);

	}

	play(){
		if(this.state.isPlay){
			$("#player").jPlayer('pause');
		}else{
			$("#player").jPlayer('play');
		}
		this.setState({
			isPlay:!this.state.isPlay
		});

	}

    render(){
		return(
			<div className="player-page">
				<h1 className="caption">我的私人音乐坊 &gt;</h1>
				<div className="mt20 row">
					<div className="controll-wrapper">
						<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
						<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
						<div className="row mt10">
						<div className="left-time -col-auto">-2:30</div>
							<i className="icon-volume rt"></i>
							<div className="volume-wrapper">
								<Progress
									progress={this.state.volume}
									onProgressChange={this.VolumeChangeHandler}
									barColor="#aaa"
								>
								</Progress>
							</div>
						</div>

					</div>
				</div>

				<div className="progressLine" style={{height:10,lineHeight:'10px'}}>
					<Progress
						progress={this.state.progress}
						onProgressChange={this.progressChangeHandler}
					>
					</Progress>
				</div>

				<div className="mt35 row">
					<div>
						<i className="icon prev"></i>
						<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
						<i className="icon next ml20"></i>
					</div>
					<div className="-col-auto">
						<i></i>
					</div>
				</div>

				<div className="-col-auto cover">
					<img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
				</div>

			</div>

		);
	}
}