export default function (state = [], action) {
    switch (action.type) {
        case 'ITEM_SELECTED':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}