import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './screens/HomeScreen';
import { Splash } from './screens/Splash';

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    {/* <Stack.Screen name="SplashScreen" component={Splash} /> */}
    <Stack.Screen name="SplashScreen" component= { Splash }/>
    <Stack.Screen name="HomeScreen" component= { HomeScreen }/>
    {/* <View style={styles.container}>
      <Text>Open up lololoollooaksdkajnsdl.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
