import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'

const PreferenceData = [
    {
        id: '1',
        icon: 'home',
        location: 'Home',
        destination: 'Fareham College, Fareham, UK'
    },
    {
        id: '2',
        icon: 'briefcase',
        location: 'Work',
        destination: 'Facebook HQ, Fareham, UK'
    }
]

const NavFavourites = () => {
  return (
    <FlatList
        data={PreferenceData}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (<View style= {[tw`bg-gray-200`, {height: 0.5}]}/>
        )}
        renderItem={({ item }) => (
            <TouchableOpacity style={tw`flex-row items-center p-5`}>
                <Icon
                    style = {tw`mr-4 rounded-full bg-gray-300 p-3`}
                    name = {item.icon}
                    color = 'white'
                    type = 'ionicon'
                    size = {18}
                />
                <View>
                    <Text style = {tw`font-semibold text-lg`}>{item.location}</Text>
                    <Text style = {tw`text-gray-500`}>{item.destination}</Text>
                </View>
            </TouchableOpacity>
        )}
    />

  )
}

export default NavFavourites

const styles = StyleSheet.create({})