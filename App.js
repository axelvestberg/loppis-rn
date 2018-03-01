/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Button
} from 'react-native';

import FetchLocation from './components/FetchLocation';
import FetchUserPlaces from './components/FetchUserPlaces';
import UsersMap from './components/UsersMap';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    userLocation: null,
    usersPlaces: []
  };
  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.10421
        }
      });
      fetch('https://reactnativemapte-1519225164266.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }, 
    err => console.log(err)
  );
  }

  getUserPlacesHandler = () => {
    fetch('https://reactnativemapte-1519225164266.firebaseio.com/places.json')
    .then(res => res.json())
    .then(parsedRes => {
      const placesArray = [];
      for (const key in parsedRes) {
        placesArray.push({
          latitude: parsedRes[key].latitude,
          longitude: parsedRes[key].longitude,
          id: key
        });
      }
      this.setState({
        usersPlaces: placesArray
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>

        <FetchUserPlaces
        onGetUserPlaces={this.getUserPlacesHandler} />

        <FetchLocation 
        onGetLocation={this.getUserLocationHandler} />

        <UsersMap 
        userLocation={this.state.userLocation} 
        usersPlaces={this.state.usersPlaces}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
