import { View, SafeAreaView, Image, Text} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { GOOGLE_MAPS_APIKEY } from '@env';

import NavOptions from '../components/NavOptions'
import tw from 'tailwind-react-native-classnames'
import { setDestination, setOrigin } from '../slices/NavSlice';
import NavFavourites from '../components/NavFavourites';

const HomeView = () => {
  const Dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={[{
            width: 100,
            height: 100, 
            resizeMode: 'contain'
          }, tw`rounded-full mx-auto`]}
          source={{
            uri: 'https://cdn.discordapp.com/avatars/149815544600592384/a_398f70e7fecd032ed54861bd3462dc7c.gif'
          }} 
        />

        <GooglePlacesAutocomplete
          styles = {{container: {flex: 0}, textInput: {fontSize: 18}}}
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
            Dispatch(setOrigin({
              location: details?.geometry.location,
              description: data.description
            }))

            Dispatch(setDestination(null))
          }}
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView> 
  )
}

export default HomeView
