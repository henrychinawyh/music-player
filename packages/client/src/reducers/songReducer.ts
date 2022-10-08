const iniitalState = {
  playList: [],
};

const songReducer = (state = iniitalState, action: any) => {
  console.log(action, iniitalState, "___actio");

  switch (action.type) {
    case "UPDATE_LIST":
      if (action.payload?.length) {
        if (action.payload.length > 1) {
          return {
            ...state,
            playList: action.payload,
          };
        } else {
          const songIndex = state.playList?.findIndex(
            (item: any) => item.url === action.payload?.[0]?.url
          );
          let tempPlayList = [...state.playList];
          if (songIndex > -1) {
            tempPlayList?.splice(songIndex, 1).concat(tempPlayList);
          } else {
            tempPlayList = action.payload?.concat(tempPlayList);
          }

          console.log(tempPlayList, "tempPlayList");

          return {
            ...state,
            playList: tempPlayList,
          };
        }
      }

      return {
        ...state,
      };

    default:
      return state;
  }
};

export default songReducer;
