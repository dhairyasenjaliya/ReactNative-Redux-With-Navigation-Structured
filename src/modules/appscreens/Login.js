import React, { PropTypes, Component } from 'react';
import { CheckBox, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'; 

class Login extends Component {
	componentDidMount() {}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ padding: 20, alignItems: 'center' }}>
					<Text style={{ fontSize: 40 }}>LOgin PLZ</Text>
				</View>
			 </View>
		);
	}
}

function mapStateToProps(state) {
	return {
		counter: state.homeReducer.counter,
		check: state.homeReducer.check,
	};
}

function mapDispatchToProps(dispatch) {
	return {
	 
		doIncrement: () => dispatch({ type: 'INCREMENT' }),
		doDecrement: () => dispatch({ type: 'DECREMENT' }),
		doCheck: () => dispatch({ type: 'CHECK' }),
		// doCheck: (variable) => dispatch({ type: 'CHECK', payload: 'test' }),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
