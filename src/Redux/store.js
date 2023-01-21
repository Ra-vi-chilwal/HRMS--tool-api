import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {userInfoReducer} from "./Reducer/user"

const initialState={};
const reducer=combineReducers({
    userInfo:userInfoReducer,

})

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;
const Store=createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default Store;