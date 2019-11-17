import PRODUCTS from '../models/dummy-data'
const initialValue = {
 value : PRODUCTS,
 cart : []
}

const shopreducer = (state = initialValue, action) => {
    //console.log("XXX =>", action.payload)
    switch (action.type) {
    case 'CARTITEMS': 
       return{ ...state,
        cart: action.payload
       }
        default: return state;
    }
}
export default shopreducer