import React, { PropTypes, Component } from 'react';
import {  CheckBox, Text, View, TouchableOpacity } from 'react-native'; 
import { connect } from 'react-redux';
import * as homeActions from '../../actions/homeActions'; 
import INCREMENT from '../../constants/actionTypes';

class Home extends Component {
	componentDidMount() {}

	toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'open',
			side: 'left',
			animated: true,
		});
	}

	render() {
		return (
			<View></View> 
		);
	}
}

function mapStateToProps(state) { 
	return {
		counter: state.homeReducer.counter,
		check: state.homeReducer.check,
		user : state.userReducer.users
	};
}

function mapDispatchToProps(dispatch) { 

	return {
		// actions: bindActionCreators(homeActions, dispatch),
		doIncrement: () => dispatch({ type: 'INCREMENT' }),
		doDecrement: () => dispatch({ type: 'DECREMENT' }),
		doCheck: () => dispatch({ type: 'CHECK' }),
		// doCheck: () => dispatch({ type: 'CHECK', payload: 'test' }),
	};
}

 

export default connect(mapStateToProps, mapDispatchToProps)(Home);
