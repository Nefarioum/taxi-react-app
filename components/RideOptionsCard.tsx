import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { selectTravelTime } from '../slices/NavSlice'

import tw from 'tailwind-react-native-classnames'

const Data  = [
  {
    id: '1',
    title: 'Eco',
    multiplier: 1,
    image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png'
  },
  {
    id: '2',
    title: 'Premium',
    multiplier: 1.2,
    image: 'https://i.ibb.co/PrbhRvW/Black-SUV-removebg-preview.png'
  },

  {
    id: '3',
    title: 'Luxary',
    multiplier: 1.75,
    image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1555366974/assets/ea/658b23-7ac3-48f8-b7ca-75646edfbf09/original/Final_Select.png'
  }

]

const Surge_Charge_Rate = 1.5;

const RideOptionsCard = () => {
  const Navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTime);
  const [selected, setSelected] = useState(null);
  
  return (
    <SafeAreaView style = {tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity onPress = {() => Navigation.navigate('NavigateCard')} style = {tw`absolute top-3 left-5 z-50 rounded-full`}>
          <Icon
            name='chevron-left'
            type='font-awesome'
            size={15}
          />
        </TouchableOpacity>
        <Text style = {tw`text-center text-xl mb-2`}>Select your Ride - {travelTimeInformation && travelTimeInformation.distance.text}</Text>
      </View>

      <FlatList
        data = {Data}
        keyExtractor = {(item) => item.id}
        renderItem = { ({ item }) => (
          <TouchableOpacity onPress = {() => setSelected(item)} style ={tw`flex-row items-center justify-between px-10 ${item.id === selected?.id && 'bg-gray-200'}`}>
            <Image 
              style = {{width: 100, height: 100, resizeMode: 'contain'}}
              source = {{ uri: item.image }}
            />
            <View style = {tw`-ml-6`}>
              <Text style = {tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelTimeInformation && travelTimeInformation.duration.text} travel time</Text>
            </View>
            <Text style = {tw`text-xl`}>{travelTimeInformation && new Intl.NumberFormat('en-gb', {
              style: 'currency',
              currency: 'GBP'
            }).format(
              (travelTimeInformation.duration.value * Surge_Charge_Rate * item.multiplier) / 100
            )}</Text>

          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity disabled={!selected} style = {tw`bg-black py-2 m-3 ${!selected && 'bg-gray-300'}`}>
          <Text style = {tw`text-center text-white text-xl`}>Choose {selected?.title} Ride</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard
