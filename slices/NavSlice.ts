import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NavSlice {
    state: any
    origin: any
    destination: any,
    travelTime: any
}

const initialState: NavSlice = {
    state: null,
    origin: '',
    destination: '',
    travelTime: ''
}

export const NavSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
        state.origin = action.payload
    },
    setDestination: (state, action) => {
        state.destination = action.payload
    },

    setTravelTime: (state, action) => {
        state.travelTime = action.payload
    }

  },
})

export const { setOrigin, setDestination, setTravelTime } = NavSlice.actions

export const selectOrigin = (state: any) => state.nav.origin;
export const selectDestination = (state: any) => state.nav.destination;
export const selectTravelTime = (state: any) => state.nav.travelTime;

export default NavSlice.reducer