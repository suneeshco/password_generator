import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slices/userAuth.js'



const store = configureStore({
    reducer: {
        userAuth : authReducer
    }
})

export default store