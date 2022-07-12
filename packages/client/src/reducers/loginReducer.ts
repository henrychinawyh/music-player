const iniitalState = {
  num: 2,
  info: null,
};

const loginReducer = (state = iniitalState, action: any) => {
  console.log(action, "action++++");

  switch (action.type) {
    case "saveInfo":
      return {
        ...state,
        info: action.payload,
      };

    default:
      return state;
  }
};

export default loginReducer;
