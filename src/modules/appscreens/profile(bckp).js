import React, { PropTypes, Component } from 'react';
import { TextInput, CheckBox, Text, View, TouchableOpacity } from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
		};
	}

	// componentDidMount(){
	// }

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ padding: 20, alignItems: 'center' }}>
					<Text style={{ fontSize: 40 }}>Setting</Text>
				</View>
				{/* <TouchableOpacity
					style={{ padding: 20, alignItems: 'center', top: 632, backgroundColor: 'yellow' }}
					onPress={() => this.props.navigation.navigate('Home')}
				>
					<Text>Homee</Text>
				</TouchableOpacity> */}

				<Text style={{ padding: 20, alignSelf: 'center', fontSize: 30 }}>
					Pressed {this.props.counter} times!
				</Text>

				<TouchableOpacity
					style={{
						padding: 20,
						alignSelf: 'center',
						fontSize: 30,
						backgroundColor: '#8bc34a',
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
						backgroundColor: '#ff5722',
						width: '50%',
					}}
					onPress={() => this.props.doDecrement()}
				>
					<Text style={{ alignSelf: 'center' }}> Decrement</Text>
				</TouchableOpacity>

				<View style={{ flexDirection: 'column', alignItems: 'center', top: 20 }}>
					<View style={{ flexDirection: 'row' }}>
						<CheckBox value={this.props.check} onValueChange={() => this.props.doCheck()} />
						{this.props.check ? (
							<Text>hola</Text>
						) : (
							<Text style={{ marginTop: 5 }}> Click MEH TO change State</Text>
						)}
					</View>
				</View>

				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1, top: 20, borderRadius: 80 }}
					onChangeText={text => this.setState({ text })}
					keyboardType={'numeric'}
					value={this.state.text}
				/>

				<TouchableOpacity
					style={{
						padding: 20,
						alignSelf: 'center',
						fontSize: 30,
						backgroundColor: '#42a5f5',
						width: '60%',
						top: 30,
					}}
					onPress={() => this.props.doUpdate(this.state.text)}
				>
					<Text style={{ alignSelf: 'center' }}> Update Value</Text>
				</TouchableOpacity>
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
		// actions: bindActionCreators(homeActions, dispatch),
		doIncrement: () => dispatch({ type: 'INCREMENT' }),
		doDecrement: () => dispatch({ type: 'DECREMENT' }),
		doCheck: () => dispatch({ type: 'CHECK' }),
		doUpdate: val => dispatch({ type: 'UPDATE', payload: val }),
		// doCheck: () => dispatch({ type: 'CHECK', payload: 'test' }),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
