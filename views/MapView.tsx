import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View } from 'react-native'

import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import Map from '../components/Map'

import tw from 'tailwind-react-native-classnames'

const MapView = () => {
  const Stack = createNativeStackNavigator();
  return (
      <View>
        <View style = {tw`h-1/2`}>
            <Map />
        </View>

        <View style = {tw`h-1/2`}> 
          <Stack.Navigator>
            <Stack.Screen
              name='NavigateCard'
              component={NavigateCard}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name='RideOptionsCard'
              component={RideOptionsCard}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </View>
    </View>
  )
}

export default MapView
