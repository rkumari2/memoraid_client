const initState = {
    bgColor: localStorage.getItem('bgColor') || '#efffd0', 
    spacing: localStorage.getItem('spacing') || '0.05rem', 
    lineSpacing: localStorage.getItem('lineSpacing') || '1.5rem', 
    size: localStorage.getItem('size') || '16px'
}



export const accessibilityReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_BG_COLOR':
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
