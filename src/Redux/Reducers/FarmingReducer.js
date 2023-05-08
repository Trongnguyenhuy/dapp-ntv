import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    account: [],
    amountOfFarmingToken: 0,
    amountOfHarvestingToken: 0,
}

const FarmingReducer = createSlice({
  name: "farmingReducer",
  initialState,
  reducers: {}
});

export const {} = FarmingReducer.actions

export default FarmingReducer.reducer