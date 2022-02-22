import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setDestination } from '../slices/NavSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GOOGLE_MAPS_APIKEY } from '@env';

import tw from 'tailwind-react-native-classnames'
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
  const Dispatch = useDispatch();
  const Navigation = useNavigation()
  return (
    <SafeAreaView style = {tw`bg-white flex-1`}>
      <Text style={tw`text-center pb-5 text-xl`}>🌤️ Good Morning</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
        <GooglePlacesAutocomplete
          styles = {{container: {flex: 0, backgroundColor: 'white', paddingTop: 20}, textInput: {fontSize: 18, borderRadius: 0, backgroundColor: '#DDDDDF'}, textInputContainer: {paddingHorizontal: 20, paddingBottom: 0}}}
          query = {{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en'
          }}
          enablePoweredByContainer = {false}
          fetchDetails = {true}
          minLength = {2}
          placeholder = 'Where to?'
          nearbyPlacesAPI = 'GooglePlacesSearch'
          debounce = {400}
          onPress = {(data, details = null) => {
            console.log(details?.geometry.location)
            Dispatch(setDestination({
              location: details?.geometry.location,
              description: data.description
            }))

            Navigation.navigate('RideOptionsCard')
          }}
        />

        </View>
        <NavFavourites />
      </View>
      <View style = {tw`flex-row bg-white justify-evenly py-2 mt-auto border-gray-100 border-t`}>
        <TouchableOpacity style = {tw`flex flex-row justify-between bg-black w-24 p-4 rounded-full`} onPress = {() => Navigation.navigate('RideOptionsCard')}>
          <Icon name='car' type='font-awesome' color='white' size={16} />
          <Text style = {tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {tw`flex flex-row justify-between w-24 p-4 rounded-full`}>
          <Icon name='fast-food-outline' type='ionicon' color='black' size={16} />
          <Text style = {tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard
