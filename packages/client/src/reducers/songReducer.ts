const iniitalState = {
  playList: [],
  cacheIds: JSON.parse(localStorage.getItem("cacheIds") || "[]"),
};

const songReducer = (state = iniitalState, action: any) => {
  console.log(action, iniitalState, "___actio");

  switch (action.type) {
    case "UPDATE_LIST":
      if (action.payload?.length) {
        if (action.payload.length > 1) {
          // 设置缓存id值
          localStorage.setItem(
            "cacheIds",
            JSON.stringify(action.payload?.map((item: any) => item.id))
          );

          return {
            ...state,
            playList: action.payload,
          };
        } else {
          let tempPlayList = [...state.playList];
          if (
            action.payload?.some((item: any) =>
              state?.cacheIds.includes(item?.id)
            )
          ) {
            const songIndex = state.cacheIds?.indexOf(action.payload?.[0]?.id);
            tempPlayList?.splice(songIndex, 1).concat(tempPlayList);
          } else {
            tempPlayList = action?.payload?.concat(tempPlayList);
          }

          localStorage.setItem(
            "cacheIds",
            JSON.stringify(tempPlayList?.map((item: any) => item?.id))
          );

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
