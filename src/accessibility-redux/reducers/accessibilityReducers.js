const initState = {
    bgColor: localStorage.getItem('bgColor'), 
    spacing: localStorage.getItem('spacing'), 
    lineSpacing: localStorage.getItem('lineSpacing'), 
    size: localStorage.getItem('size')
}


export const accessibilityReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_BG_COLOR':
            // console.log('Updating background color:', action.payload);
            return {... state, bgColor:action.payload};
        case 'SET_LETTER_SPACING':
            return {... state, spacing: action.payload};
        case 'SET_LINE_SPACING':
            return {... state, lineSpacing: action.payload};
        case 'SET_FONT_SIZE': 
            return {... state, size: action.payload}
        default: 
            return state
    }
}
