import React, { PropTypes, Component } from 'react';
import { StyleSheet, ScrollView, Image, TextInput, CheckBox, Text, View, TouchableOpacity, Alert } from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import UserInfo from './UserInfo';

class Chat extends Component {
	constructor(props) {
		super(props); 
	}
 
	render() {
		return (
			<View style={{ flex: 1 }}>
			 <Text style={{ alignSelf:'center' ,fontSize :20 }}>Welcome : { this.props.user.name ?  this.props.user.name :'Guest, Please Login To Avil Chat Functionality' } !</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		top: '-50%',
		width: 250,
		height: 60,
		alignItems: 'center',
		backgroundColor: '#EF5350',
		alignSelf: 'center',
	},
});

function mapStateToProps(state) {
	return {
		user: state.userReducer.users,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUser: user => dispatch({ type: 'USER', payload: user }), 
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chat);
