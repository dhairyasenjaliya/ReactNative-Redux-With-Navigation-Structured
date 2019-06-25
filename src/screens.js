/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/global/Drawer';
import Home  from './modules/appscreens/Home';
import Profile  from './modules/appscreens/Profile'; 
import FirstScreen from './modules/appscreens/FirstScreen';
import Login from './modules/appscreens/Login';
import Chat from './modules/appscreens/Chat';
 

export function registerScreens(store, Provider, persistor) {
			Navigation.registerComponent('app.Drawer', () => Drawer);
			Navigation.registerComponent('app.Home', () => Home, store, Provider, persistor);
			Navigation.registerComponent('app.Profile', () => Profile, store, Provider, persistor);
			Navigation.registerComponent('app.FirstScreen', () => FirstScreen, store, Provider, persistor);
			Navigation.registerComponent('app.Login', () => Login, store, Provider, persistor);
			Navigation.registerComponent('app.Chat', () => Chat, store, Provider, persistor); 
}
