import React from 'react'
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Button,
  View,
  Alert,
  AsyncStorage
} from 'react-native'
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  DrawerItems
} from 'react-navigation'
import PropTypes from 'prop-types'

import { Header, Container, Content } from 'native-base'
import LoadingScreen from '../screens/auth/LoadingScreen'
import SignInScreen from '../screens/auth/SignInScreen'
import SignUpScreen from '../screens/auth/SignUpScreen'
import CreateDogScreen from '../screens/auth/CreateDogScreen'
import WelcomeScreen from '../screens/auth/WelcomeScreen'
import AddDogScreen from '../screens/AddDogScreen'

import ChangeDogScreen from '../screens/ChangeDogScreen'
import DashBoardScreen from '../screens/DashBoardScreen'
import WalkScreen from '../screens/WalkScreen'
import HistoryScreen from '../screens/HistoryScreen'
import DogAddedScreen from '../screens/DogAddedScreen'
import TripsListScreen from '../screens/TripsListScreen'
import TripMapViewScreen from '../screens/TripMapViewScreen'

const styles = StyleSheet.create({
  hamburgerHeaderStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 35
  },
  doubleBoneIconStyle: {
    width: 33,
    height: 33,
    right: 15,
    bottom: 18
  },
  signOutBtnStyle: {
    top: 35
  }
})

async function signOutAsyncStorageCleaning(props) {
  await AsyncStorage.removeItem('email')
  await AsyncStorage.removeItem('fullName')
  await AsyncStorage.removeItem('dogName')
  await AsyncStorage.removeItem('arrOfDogs')
  props.navigation.navigate('Auth')
}

function handleSignOut(props) {
  Alert.alert(
    'Are you sure you want to sign out?',
    null,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'OK', onPress: () => signOutAsyncStorageCleaning(props) }
    ],
    { cancelable: false }
  )
}

const CustomDrawerContentComponent = props => (
  <Container>
    <Header style={styles.hamburgerHeaderStyle}>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <Image
          style={styles.doubleBoneIconStyle}
          source={require('../../assets/hamburgerMenu/hamburgerMenuDoubleIcon.png')}
        />
      </TouchableOpacity>
    </Header>
    <Content>
      <DrawerItems {...props} />
      <View style={styles.signOutBtnStyle}>
        <Button title="sign out" color="red" onPress={() => handleSignOut(props)} />
      </View>
    </Content>
  </Container>
)

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 0,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0]
      })

      return { transform: [{ translateX }] }
    }
  }
}

const AuthStack = createStackNavigator(
  {
    LoadingScreen: { screen: LoadingScreen },
    SignInScreen: { screen: SignInScreen },
    SignUpScreen: { screen: SignUpScreen },
    CreateDogScreen: { screen: CreateDogScreen },
    WelcomeScreen: { screen: WelcomeScreen },
    DogAddedScreen: { screen: DogAddedScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#15cda8',
        height: 24,
        borderBottomWidth: 0
      }
    },
    transitionConfig
  }
)

const AppStack = createDrawerNavigator(
  {
    Dashboard: { screen: DashBoardScreen },
    'Going out for a walk!': { screen: WalkScreen },
    "Watch your dog's history": { screen: HistoryScreen },
    'Change dog': { screen: ChangeDogScreen },
    'Add dog': { screen: AddDogScreen },
    TripsListScreen: { screen: TripsListScreen },
    TripMapViewScreen: { screen: TripMapViewScreen }
  },

  {
    drawerPosition: 'right',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
)

const NavigatorContainer = createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen,
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
)

NavigatorContainer.propTypes = {
  navigation: PropTypes.object
}

CustomDrawerContentComponent.propTypes = {
  navigation: PropTypes.object
}

export default NavigatorContainer
