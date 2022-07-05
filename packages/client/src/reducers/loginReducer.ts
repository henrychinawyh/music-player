const iniitalState = {
  num: 2,
};

const loginReducer = (state = iniitalState, action: any) => {
  switch (action.type) {
    case "IS_LOGIN":
      return {
        ...state,
        num: action.payload,
      };

    default:
      return state;
  }
};

export default loginReducer;
