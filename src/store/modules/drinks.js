import produce from 'immer';

export default function drinks(state = [], action) {
  switch (action.type) {
    case '@drink/ADD_DRINKS':
      return produce(state, draft => {
        draft.push(...action.drinks);
      });
    case '@drink/ADD_DRINKS_FAVORITE':
      return produce(state, draft => {
        const index = draft.findIndex(ind => ind.idDrink === action.id);
        draft[index].favorite = action.toggle;
      });

    default:
      return state;
  }
}
