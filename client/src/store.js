import { combineReducers, configureStore } from '@reduxjs/toolkit'
import UserSlice from './redux/user/userAuth'
import { persistStore, persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/es/storage/session'

const rootReducer = combineReducers({
    user: UserSlice,
})




const persistConfig = {
    key: 'root',
    storage: sessionStorage,
  }
   
    const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>{
      return  getDefaultMiddleware({
            serializableCheck: false,
        })
    }
  },
)

export const persistor = persistStore(store)