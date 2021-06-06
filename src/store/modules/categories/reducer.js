import produce from 'immer';

export default function categories(state = [], action) {
  if (state.length <= 0) {
    switch (action.type) {
      case 'ADD_CATEGORIES':
        return produce(state, draft => {
          draft.push(...action.categories);
        });

      default:
        return state;
    }
  } else return state;
}
