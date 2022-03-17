import {configureStore} from '@reduxjs/toolkit'
import CartSlice from './Cart-slice'
import AuthSlice from './Auth-slice'

const Store= configureStore({
    reducer: {cart:CartSlice.reducer,auth:AuthSlice.reducer}
})

export default Store