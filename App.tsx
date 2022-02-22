import { Provider } from 'react-redux';
import { Store } from './Store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeView from './views/HomeView';
import MapView from './views/MapView';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'expo-modules-core';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
            behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset = {Platform.OS === 'ios' ? -64 : 0}
            style = {{flex: 1}}>
            <Stack.Navigator>
              <Stack.Screen
                name = 'HomeView'
                component = { HomeView }
                options =  {{
                  headerShown: false
                }}
              />

              <Stack.Screen
                name = 'MapView'
                component = { MapView }
                options =  {{
                  headerShown: false
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}