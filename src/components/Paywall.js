import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PaymentButtons from './PaymentButtons.js';

class Paywall extends Component {
	render() {
		let type, subtype, textAccess = "Access";

		if (this.props.activeFile){
			type = this.props.activeFile.info.type;
			subtype = this.props.activeFile.info.subtype;

			if (type === "Video"){
				textAccess = "Watch"
			} else if (type === "Image"){
				textAccess = "View"
			} else if (type === "Audio"){
				textAccess = "Listen to"
			}

			if (subtype === "F-HD1080")
				subtype = "Movie"
		}
		return (
			<div className='paywall' style={(this.props.activeFile && this.props.activeFile.isPaid && !this.props.activeFile.hasPaid && !this.props.activeFile.owned && !this.props.artifactState.isFetching) ? {} : {display: "none"}}>
				<div className="d-flex align-items-center justify-content-center text-center paywall-container">
					<div style={{width: "80%"}}>
						<h4 style={{marginBottom: "0px"}}>To {textAccess} this {(!subtype || subtype === "" || subtype === "Basic") ? type : subtype}</h4>
						<span>please...</span>
						<br/>
						<PaymentButtons
							artifact={this.props.artifact}
							activeFile={this.props.activeFile}
							payForFileFunc={this.props.payForFileFunc}
							buyFileFunc={this.props.buyFileFunc}
                            setCurrentFile={this.props.setCurrentFile}
                            isPlayingFile={this.props.isPlayingFile}
                        />
						<a href=""><p style={{margin: "75px 0px -75px 0px", color:"#fff", textDecoration: "underline"}}>How does this work? <span className="icon icon-help-with-circle"></span></p></a>
					</div>
				</div>
			</div>
		);
	}
}

Paywall.propTypes = {
    activeFile: PropTypes.object,
    artifact: PropTypes.object,
    artifactState: PropTypes.object,
    payForFileFunc: PropTypes.func,
    buyFileFunc: PropTypes.func,
    setCurrentFile: PropTypes.func,
    isPlayingFile: PropTypes.func
}

export default Paywall;
