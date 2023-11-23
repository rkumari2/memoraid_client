export const setBgColor = (element, color) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_BG_COLOR',
            payload: {element, color}
        })
    }
}


export const setLetterSpacing = (spacing) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_LETTER_SPACING',
            payload: spacing
        })
    }
}

export const setLineSpacing = (lineSpacing) => {
    return (dispatch) => {
        dispatch ({
            type: 'SET_LINE_SPACING',
            payload: lineSpacing
        })
    }
}

export const setFontSize = (size) => {
    return (dispatch) => {
        dispatch ({
            type: 'SET_FONT_SIZE',
            payload: size
        })
    }
}
