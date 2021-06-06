import produce from 'immer';

export default function drinks(state = [], action) {
  switch (action.type) {
    case 'ADD_DRINKS':
      return produce(state, draft => {
        draft.push(...action.drinks);
      });

    default:
      return state;
  }
}
