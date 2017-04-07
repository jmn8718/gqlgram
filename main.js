import Expo from 'expo';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { NavigationProvider, StackNavigation } from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { ApolloProvider } from 'react-apollo';

import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import { client } from './apolloClient';

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
    this._getUserFromStore();
  }

  _onLogIn = async (token) => {
    console.log('tok', token)
    AsyncStorage.setItem('token', token)
      .then((encodedToken) => {
          console.log('pr', encodedToken)
          this.setState({ isLoggedIn: true });
        })
        .catch((failure) => {
            console.error('ERROR: no token', failure);
          }
        );
  }

  _onLogOut = async () => {
    AsyncStorage.clear();
    this.setState({ isLoggedIn: false });
  }

  _getUserFromStore = async () => {
    AsyncStorage.getItem('token')
      .then((encodedToken) => {
          console.log('pr', encodedToken)
          if (encodedToken) {
            this.setState({ isLoggedIn: true });
          }
        })
        .catch((failure) => {
            console.error('ERROR: no token', failure);
          }
        );
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [require('./assets/images/expo-wordmark.png')],
        fonts: [
          FontAwesome.font,
          { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        ],
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <ApolloProvider client={client}>
          <View style={StyleSheet.absoluteFill}>
            <NavigationProvider router={Router}>
              <StackNavigation
                id="root"
                initialRoute={Router.getRoute('rootNavigation')}
                logout={() => {}}
              />
            </NavigationProvider>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' &&
              <View style={styles.statusBarUnderlay} />}
          </View>
        </ApolloProvider>
      );
    } else {
      return <Expo.AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

Expo.registerRootComponent(AppContainer);
