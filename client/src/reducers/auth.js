const initialState = {
    loginToken: '',
    registered: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'SET_LOGIN_TOKEN':
        return {
          ...state,
          loginToken: action.payload
        };
      case 'REGISTERED':
        return {
          ...state,
          registered: true
        };
      default:
      return state;
    }
  }
  export default authReducer;