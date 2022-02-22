import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, selectDestination, setTravelTime } from '../slices/NavSlice';
import { useEffect, useRef } from 'react';
import { GOOGLE_MAPS_APIKEY } from '@env';

import tw from 'tailwind-react-native-classnames';
import MapViewDirections from 'react-native-maps-directions';

const Map = () => {
  const Origin = useSelector(selectOrigin);
  const Destination = useSelector(selectDestination);
  const Dispatch = useDispatch();
  const MapRef = useRef(null)

  useEffect(() => {
    if (!Origin || !Destination) return; 
    
    MapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50}
    });
  }, [Origin, Destination])

  useEffect(() => {
    if (!Origin || !Destination || !GOOGLE_MAPS_APIKEY) return; 
    
    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${Origin.description}&destinations=${Destination.description}&key=${GOOGLE_MAPS_APIKEY}`).then(res => res.json()).then(data => {
        Dispatch(setTravelTime(data.rows[0].elements[0]))
      });
    }

    getTravelTime()
  }, [Origin, Destination, GOOGLE_MAPS_APIKEY])

  return (
      <MapView
        ref = {MapRef}
        style = {tw`flex-1`}
        initialRegion={{
          latitude: Origin.location.lat,
          longitude: Origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>

        {Origin && Destination && (
          <MapViewDirections
            origin={Origin.description}
            destination={Destination.description}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth = {3}
            strokeColor = 'black'
          />
        )}
                
        {Origin?.location && (
            <Marker 
                coordinate={{
                    latitude: Origin.location.lat,
                    longitude: Origin.location.lng
                }}
                title = "Starting At"
                description = {Origin.description}
                identifier = "origin"
            />
        )}

        {Destination?.location && (
            <Marker 
                coordinate={{
                    latitude: Destination.location.lat,
                    longitude: Destination.location.lng
                }}
                title = "Arriving"
                description = {Destination.description}
                identifier = "destination"
            />
        )}
     </MapView>

  )
}

export default Map


/*
            Dispatch(setOrigin({
                location: {lat: location.coords.latitude, lng: location.coords.longitude},
                description: 'Your current location'
              }))


              (Origin.location == undefined ? (text == 'Waiting..' ? 0 : text.coords.latitude) : Origin.location.lat)
              */
