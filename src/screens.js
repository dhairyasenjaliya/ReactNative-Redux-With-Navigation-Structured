/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/global/Drawer';
import Home  from './modules/appscreens/Home';
import Profile  from './modules/appscreens/Profile'; 
import FirstScreen from './modules/appscreens/FirstScreen';
import Login from './modules/appscreens/Login';
 

export function registerScreens(store, Provider) {
        Navigation.registerComponent('app.Drawer', () => Drawer);
        Navigation.registerComponent('app.Home', () => Home, store, Provider);
    	Navigation.registerComponent('app.Profile', () => Profile, store, Provider) ; 
        Navigation.registerComponent('app.FirstScreen', () => FirstScreen, store, Provider);
        Navigation.registerComponent('app.Login', () => Login, store, Provider);

}
