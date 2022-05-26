import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        itemsOnPage: 3,
    },
    reducers: {
        set: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.itemsOnPage = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { set } = productsSlice.actions

export default productsSlice.reducer