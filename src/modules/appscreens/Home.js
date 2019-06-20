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
			<View style={{ flex: 1 }}>
				<View style={{ padding: 20, alignItems: 'center' }}>
					<Text style={{ fontSize: 25 }}>Welcome Home , {this.props.user} ! </Text>
				</View>
				{/* <TouchableOpacity
					style={{ padding: 20, alignItems: 'center', top: 632, backgroundColor: 'yellow' }}
					onPress={() => this.props.navigation.navigate('Settings')}
				>
					<Text>Setting</Text>
				</TouchableOpacity> */}
				<Text style={{ padding: 20, alignSelf: 'center', fontSize: 30 }}>
					Pressed {this.props.counter} times!
				</Text>
				<TouchableOpacity
					style={{
						padding: 20,
						alignSelf: 'center',
						fontSize: 30,
						backgroundColor: '#cddc39',
						width: '50%',
					}}
					title="Increment"
					onPress={() => this.props.doIncrement()}
				>
					<Text style={{ alignSelf: 'center' }}>Increment</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						padding: 20,
						alignSelf: 'center',
						fontSize: 30,
						backgroundColor: '#ff7043',
						width: '50%',
					}}
					title="Decrement"
					onPress={() => this.props.doDecrement()}
				>
					<Text style={{ alignSelf: 'center' }}> Decrement</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						padding: 20,
						alignSelf: 'center',
						fontSize: 30,
						backgroundColor: '#cddc39',
						width: '50%',
					}}
					title="Increment"
					onPress={()=>this.toggleDrawer()}
				>
					<Text style={{ alignSelf: 'center' }}>SHOW Drawer</Text>
				</TouchableOpacity>

				<View style={{ flexDirection: 'column', alignItems: 'center', top: 20 }}>
					<View style={{ flexDirection: 'row' }}>
						<CheckBox
							value={this.props.check}
							// onValueChange={() => this.setState({ checked: !this.props.checked })     }
							onValueChange={() => this.props.doCheck()}
						/>
						{this.props.check ? (
							<Text> hola</Text>
						) : (
							<Text style={{ marginTop: 5 }}> Click MEH TO change State</Text>
						)}
					</View>
				</View>
			</View>
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
