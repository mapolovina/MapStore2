/**
 * Copyright 2015, Marko Polovina
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react'),
ScaleBarController,
ScaleBoxController = require('./ScaleBox');

/**
 * [ScaleBarController new React Controller for ScaleBar]
 */
ScaleBarController = React.createClass({
	/**
	 * [propTypes types of props]
	 * @type {Object}
	 */
	propTypes: {
		scalebox: React.PropTypes.object
	},
	/**
	 * [getDefaultProps fetch default props]
	 * @return {[Object]} [return scalebox object]
	 */
	getDefaultProps() {
        	return {
            		scalebox: {
            			getBarValues: function () {
					var def = new $.Deferred(), random;

					setTimeout(function () {
						random = Math.random() * (400 - 50) + 50;
						def.resolve(['1:5000', 150]);
					}, 1000);

					return def.promise();
				}
	        	}
	    	};
	},
	/**
	 * [getInitialState get initial state]
	 * @return {[Object]} [return empty object]
	 */
	getInitialState() {
		return {}
	},
	/**
	 * [render render view]
	 * @return {[HTML element]} [html]
	 */
	render() {
		return (
			<div className="mapstore-scalebox-bar-main">
				<div className="mapstore-scalebox-bar-dist" style={this.state.width}>
					<span>{this.state.distText}</span>
				</div>
			</div>
		);
	},
	/**
	 * [componentDidMount after component is loaded]
	 * @return {[undefined]} [no return]
	 */
	componentDidMount() {
		var that = this;

		// start function where I get scalebar values and then change the state
		that.setStateBar();

		// when zoom ends trigger function that changes the state  
		leafMap.on('zoomend', function () {
			that.setStateBar();
		});
	},
	/**
	 * [setStateBar get scalebar values and then set state]
	 */
	setStateBar() {
		var that = this; 

		// fetch scalebar values (response is array)
		that.props.scalebox.getBarValues().done(function (res) {
			that.setState({
				distText: res[0],
				width: {
					width: res[1]
				}
			});
		});
	}
});

module.exports = ScaleBarController;