import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './screens/HomeScreen';
import { Budget } from './screens/Budget';
import { LocationPermission } from './screens/LocationPermission';
import { Splash } from './screens/Splash';
import { SignUp } from './screens/SignUp';
import { Log } from './screens/Log';
import { Warning } from './screens/Warning';
const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    {/* <Stack.Screen name="SplashScreen" component={Splash} /> */}
    <Stack.Screen name="LocationPermission" component= { LocationPermission }/>
    <Stack.Screen name="HomeScreen" component= { HomeScreen }/>
    <Stack.Screen name="Warning" component= { Log }/>
    <Stack.Screen name="Budget" component= { Budget }/> 
    <Stack.Screen name="Splash" component= { Splash }/>
    <Stack.Screen name="SignUp" component= { SignUp }/>
    <Stack.Screen name="Log" component= { Log }/>

    {/* <View style={styles.container}>
      <Text>Open up lololoollooaksdkajnsdl.js to start working on your app!</Text>
      <StatusBar sty~~le="auto" />
    </View> */}
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
