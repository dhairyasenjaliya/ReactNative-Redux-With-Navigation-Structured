import React, { PropTypes, Component  } from 'react';
import { CheckBox, Text, View, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native'; 
import { connect } from 'react-redux';
import * as homeActions from '../../actions/homeActions'; 
import INCREMENT from '../../constants/actionTypes';
import * as axios from  'axios' ;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
	}
  

		componentDidMount() {
			axios
				.get('http://football.apitestdomain.xyz/api/playerinfo?level=easy')
				.then(response => { 
					this.setState({
						data: response.data,
					}); 
					// console.warn(this.state.data[3].player_club[0].club[0].photo);
				})
				.catch(error => {
					console.warn(error);
				});
		}
	  

	toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'open',
			side: 'left',
			animated: true,
		});
	} 
	
	render() { 
		let domain = 'http://football.apitestdomain.xyz/';
		return (
			<View style={styles.MainContainer}>
				{/* {SampleNameArray.map((item, key) => (
					<Text key={key} style={styles.TextStyle} onPress={this.SampleFunction.bind(this, item)}>
						{' '}
						{item}{' '}
					</Text>
				))} */}

				<ScrollView>
					{this.state.data.map((item, key) => (
						<TouchableOpacity key={key}>
							<Text style={styles.TextStyle}> Name : {item.name} </Text>
							<Text style={styles.TextStyle}> National Team : {item.national_team} </Text>
							<Text style={styles.TextStyle}> Club :   </Text>
							<Image
								style={{ width: 70, height: 70 }}
								source={{
									uri: domain + item.player_club[0].club[0].photo,
								}}
							/>

							<View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	MainContainer: {
		flex: 1,
		margin: 10,
	},

	TextStyle: {
		fontSize: 15,
	},
});

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
