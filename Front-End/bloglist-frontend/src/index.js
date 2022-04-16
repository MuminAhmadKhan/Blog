import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import alertReducer from "./Reducers/alertReducer";
import blogReducer from "./Reducers/blogReducer";
import userReducer from "./Reducers/userReducer";
const store = configureStore({
    reducer: {
     alert : alertReducer,
     blog : blogReducer , 
     user : userReducer
    }
  })
ReactDOM.render( 
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById("root"));
