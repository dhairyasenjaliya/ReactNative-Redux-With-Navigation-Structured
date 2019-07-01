import React, { PropTypes, Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	Image,
	TextInput,
	CheckBox,
	Text,
	View,
	TouchableOpacity,
	Alert,
	AsyncStorage,
} from 'react-native';
// import { bindActionCreators } from 'redux';
import { YellowBox } from 'react-native';
import { connect } from 'react-redux';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import UserInfo from './UserInfo';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat'; 

const USER_ID = '@userId';

YellowBox.ignoreWarnings([
	'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			userId: null, 
		};
		// this.socket = SocketIOClient('http://localhost:3000');
		// this.socket.emit('channel1', 'Hi server'); // emits 'hi server' to your server
		// // Listens to channel2 and display the data recieved
		// this.socket.on('channel2', data => {
		// 	console.log('Data recieved from server', data); //this will console 'channel 2'
		// });
		this.determineUser = this.determineUser.bind(this);
		this.onReceivedMessage = this.onReceivedMessage.bind(this);
		this.onSend = this.onSend.bind(this);
		this._storeMessages = this._storeMessages.bind(this);

		this.socket = SocketIOClient('http://192.168.0.7:3000'); 
	 
		this.socket.on('message', this.onReceivedMessage); 

		// this.socket.on('connect', () => {
		// 	console.warn('connected');
		// });
		
		this.determineUser();  
 
	}

	componentWillMount() {
		this.setState({
			messages: [
				{
					_id: 1,
					text: 'Hello developer',
					createdAt: new Date(),
					user: {
						_id: 2,
						name: 'React Native',
						avatar: 'https://placeimg.com/140/140/any',
					},
					image: 'https://placeimg.com/230/140/any',
				},
				{
					_id: 2,
					text: 'Hope Your doing great',
					createdAt: new Date(),
					user: {
						_id: 1,
						name: 'React Native',
						avatar: 'https://placeimg.com/140/140/any',
					},
					image: 'https://placeimg.com/230/220/any',
				},
			],
		});
	}

	determineUser() {
		AsyncStorage.getItem(USER_ID)
			.then(userId => {
				// If there isn't a stored userId, then fetch one from the server.
				if (!userId) {
					this.socket.emit('userJoined', null);
					this.socket.on('connection', userId => {
						AsyncStorage.setItem(USER_ID, userId);
						this.setState({ userId });
					});
				} else {
					this.socket.emit('userJoined', userId);
					this.setState({ userId });
				}
			})
			.catch(e => alert(e));
	}

	// Event listeners
	/**
	 * When the server sends a message to this.
	 */
	onReceivedMessage(messages) { 
		this._storeMessages(messages); 
	}

	/**
	 * When a message is sent, send the message to the server
	 * and store it in this component's state.
	 */
	onSend(messages = []) { 
		this.socket.emit('message', messages[0]);
		this._storeMessages(messages);
	}

	_storeMessages(messages) {
		this.setState(previousState => {
			return {
				messages: GiftedChat.append(previousState.messages, messages),
			};
		});
	}

	// clicked = () => {
	// 	const dataObj = {
	// 		action: 'click',
	// 	};

	// 	this.socket.emit('channel2', dataObj);
	// };

	render() {
		// return (
		// 	<View style={{ flex: 1 }}>
		// 		<Text style={{ alignSelf: 'center', fontSize: 20 }}>
		// 			Welcome :
		// 			{this.props.user.name ? this.props.user.name : 'Guest, Please Login To Avil Chat Functionality'} !
		// 		</Text>

		// 		<TouchableOpacity onPress={() => this.clicked()}>
		// 			<Text>Message</Text>
		// 		</TouchableOpacity>
		// 	</View>
		// );
		var user = { _id: this.state.userId || -1 };

		return <GiftedChat messages={this.state.messages} onSend={this.onSend} user={user} />;
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
