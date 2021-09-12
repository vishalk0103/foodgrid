import {configureStore} from '@reduxjs/toolkit'
import CartSlice from './Cart-slice'

const Store= configureStore({
    reducer: {cart:CartSlice.reducer}
})

export default Store