import {createStore} from "redux";
import {produce} from "immer";
//why we immer because it is easy to use and it is faster than the normal way of creating the new object of state

const initialState = {
    name : "Bilal",
    address: {
        street: "123 Main St",
        city: "Boston",
        state: "MA"
    }
}

const STREET_UPDATED = 'STREET_UPDATED';
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}
// how we define reducer like this
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // how we create the new object of state
           /* return {
                ...state,
                address: {
                    ...state.address,
                    street: action.payload
                }
            }*/
            // how we create the new object of state using immer
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default:
            return state
    }
}
// how we create the store
const store = createStore(reducer);
console.log('Initial state', store.getState());
// how we subscribe to the store(we can see when the state is updated)
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()));
// how we dispatch the action
store.dispatch(updateStreet('456 Main St'));
unsubscribe();