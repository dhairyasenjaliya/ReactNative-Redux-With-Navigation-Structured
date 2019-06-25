import React, { PropTypes, Component } from 'react';
import { StyleSheet, ScrollView, Image, TextInput, CheckBox, Text, View, TouchableOpacity, Alert } from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import { GoogleSignin } from 'react-native-google-signin';


class UserInfo extends Component {

  componentDidMount(){ 
  }

	_signOut = async () => {
		//Remove user session from the device.
		try {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
			// this.setState({ user: null }); // Remove the user from your app's state as well
			this.props.logoutUser();
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		return (
			<View>
				<TouchableOpacity style={styles.button} onPress={this._signOut}>
					<View>
						<Text style={styles.buttonText}>LogOut</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.card}>
					<Text style={styles.cardContent}>First Name : {this.props.user.givenName}</Text>
					<Text style={styles.cardContent}>Last Name : {this.props.user.familyName}</Text>
					<Text style={styles.cardContent}>Email : {this.props.user.email}</Text>
				</View>
			</View>
		);
	}
} 
const styles = StyleSheet.create({

  card :{ 
      top : '20%',
      padding : 30, 
      width : 350,
      height : 150,
      alignSelf:'center',
      borderRadius : 50
  },

  cardContent:{
      fontSize :20, 
  },

	button: {
		top: '-20%',
		width: 250,
		height: 60,
		alignItems: 'center',
		backgroundColor: '#EF5350',
		borderRadius: 30,
		alignSelf: 'center',
	},
	buttonText: {
		color: '#ffffff',
		top: '30%',
		fontSize: 25,
		fontWeight: 'bold',
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
		logoutUser: () => dispatch({ type: 'LOGOUT' }),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserInfo);
