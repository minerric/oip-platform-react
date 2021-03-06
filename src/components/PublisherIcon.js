import React, { Component } from 'react';

import Avatars from '@dicebear/avatars';
import MaleSpriteCollection from '@dicebear/avatars-male-sprites';
import FemaleSpriteCollection from '@dicebear/avatars-female-sprites';

let maleAvatars = new Avatars(MaleSpriteCollection);
let femaleAvatars = new Avatars(FemaleSpriteCollection);

class PublisherIcon extends Component {
	constructor(props){
		super(props);

		this.state = {
			avatarSrc: ""
		}

		this.updateAvatar = this.updateAvatar.bind(this);
		this.setDiceBearAvatar = this.setDiceBearAvatar.bind(this);
	}
	componentDidMount(){
		// Every time the state changes, log it
		this.updateAvatar(this.props)
	}
	componentWillReceiveProps(nextProps){
		if (this.props.id !== nextProps.id)
			this.updateAvatar(nextProps)
	}
	updateAvatar(props){
		if (!props.id)
			return;

		this.setDiceBearAvatar(props)
	}
	setDiceBearAvatar(props){
		if (!props.id)
			return

		var randomTrueFalse = isNaN(props.id.slice(17,18));
		var gender = randomTrueFalse ? "male" : "female";

		this.setState({
			avatarSrc: "data:image/svg+xml;utf8," + (gender === "male" ? maleAvatars.create(props.id) : femaleAvatars.create(props.id))
		})
	}
	render() {
		return (<img style={{width: this.props.width, maxWidth: this.props.maxWidth, height: this.props.height, maxHeight: this.props.maxHeight}}
					 className={ this.props.className ? this.props.className + " border-0 publisher-image" : "border-0 publisher-image"}
                     ref={image => this.image = image}
                     src={this.state.avatarSrc}
                     alt="Pub Icon" />
		);
	}
}

export default PublisherIcon;
