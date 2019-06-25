import React, { PropTypes, Component } from 'react';
import {StyleSheet, ScrollView , Image,  TextInput, CheckBox, Text, View, TouchableOpacity ,Alert } from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';  
import { GoogleSignin , GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import UserInfo from './UserInfo'

class Profile extends Component {
	 
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			userInfo: '',
			email: '',
			password: '',
			errorMessage: null,
		};
	}

	componentDidMount() {
		GoogleSignin.configure({
			//It is mandatory to call this method before attempting to call signIn()
			scopes: ['https://www.googleapis.com/auth/drive.readonly'],
			// Repleace with your webClientId generated from Firebase console
			webClientId: '277272543746-asbfl5t12imsf8pdfri4jooabffnqtor.apps.googleusercontent.com',
		}); 
	}

	_signIn = async () => {
		//Prompts a modal to let the user sign in into your application.
		try {
			await GoogleSignin.hasPlayServices({
				//Check if device has Google Play Services installed.
				//Always resolves to true on iOS.
				showPlayServicesUpdateDialog: true,
			});
			const userInfo = await GoogleSignin.signIn();
			// console.warn('User Info --> ', userInfo);
			this.props.fetchUser(userInfo.user);
			// console.warn(userInfo.user)
			// this.setState({ user: userInfo.user });
			// console.warn(this.props.user)
		} catch (error) {
			// console.warn('Message', error.message);
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				Alert.alert('User Cancelled');
				// console.warn('User Cancelled the Login Flow');
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// console.warn('Signing In');
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// console.warn('Play Services Not Available or Outdated');
			} else {
				// console.warn('Some Other Error Happened');
			}
		}
	};
	_getCurrentUser = async () => {
		//May be called eg. in the componentDidMount of your main component.
		//This method returns the current user
		//if they already signed in and null otherwise.
		try {
			const userInfo = await GoogleSignin.signInSilently();
			this.setState({ userInfo });
		} catch (error) {
			console.error(error);
		}
	};

	_revokeAccess = async () => {
		//Remove your application from the user authorized applications.
		try {
			await GoogleSignin.revokeAccess();
			console.warn('deleted');
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Image
					style={{ height: 200 }}
					source={
						this.props.user == 'Guest'
							? require('../../assets/userdefault.jpg')
							: { uri: this.props.user.photo }
					}
				/> 
				<View>
					{this.props.user == 'Guest' ? (
						<GoogleSigninButton
							style={styles.button}
							size={GoogleSigninButton.Size.Wide}
							color={GoogleSigninButton.Color.Dark}
							onPress={this._signIn}
							disabled={this.state.isSigninInProgress}
						/>
					) : (
						<UserInfo />
					)}
				</View>
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
		} 
});



function mapStateToProps(state) {
	return {
		user: state.userReducer.users,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUser: user => dispatch({ type: 'USER', payload: user }),
		logoutUser:() => dispatch({type : 'LOGOUT'})
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);



