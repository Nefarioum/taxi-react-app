import { useNavigation } from '@react-navigation/native'
import { View, Image, FlatList, TouchableOpacity, Text} from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'

import tw from 'tailwind-react-native-classnames'
import { selectOrigin } from '../slices/NavSlice'

interface ButtonInstance {
    id: string
    title: string
    image: string
    screen: any
    disabled: boolean
}

const ButtonData: Array<ButtonInstance> = [
    {
        id: '1',
        title: 'Get a ride!',
        image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png',
        screen: 'MapView',
        disabled: false

    },
    {
        id: '2',
        title: 'Order Food! (Coming Soon)',
        image: 'https://i.postimg.cc/43R7vCnw/png-transparent-fast-food-american-chinese-cuisine-hamburger-take-out-food-box-s-food-takeout-americ.png',
        screen: 'EatsView',
        disabled: true
    }
]

const NavOptions = () => {
  const Navigation = useNavigation();
  const Origin = useSelector(selectOrigin)

  return (
    <FlatList
        data = {ButtonData}
        horizontal
        keyExtractor = {(item) => item.id}
        renderItem = { ({ item }) => (
            <TouchableOpacity 
            onPress = {() => Navigation.navigate(item.screen)}
            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
            disabled={(!Origin || item.disabled ? true : false)}>
                <View style={tw`${(!Origin || item.disabled ? 'opacity-20' : '')} `}>
                    <Image
                        style = {{
                            width: 120,
                            height: 120,
                            resizeMode: 'contain'
                        }}
                        source = {{
                            uri: item.image
                        }}
                    />
                    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                    <Icon 
                        style = {tw`p-2 bg-black rounded-full w-10 mt-4`}
                        name = 'arrowright'
                        color = 'white'
                        type = 'antdesign'
                    />
                </View>
            </TouchableOpacity>
        )}
    />
  )
}

export default NavOptions
