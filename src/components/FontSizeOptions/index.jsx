import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

const fontSizeOptions = ({handleFontSizeChange}) => {

  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility);

  return (
    <div>
          <h3> Change font size </h3>
          <div>
            {/* <div > */}
              <input
                type="radio"
                name='font-size'
                value='16px'
                checked={size === '16px'}
                onChange={() => handleFontSizeChange('16px')} />
              <label htmlFor="16px font size"> Small </label>
            {/* </div> */}

            {/* <div> */}
              <input
                type="radio"
                name='font-size'
                value='18px'
                checked={size === '18px'}
                onChange={() => handleFontSizeChange('18px ')} />
              <label htmlFor="18px  font size"> Medium </label>
            {/* </div> */}

            {/* <div> */}
              <input
                type="radio"
                name='font-size'
                value='10px'
                checked={size === '10px'}
                onChange={() => handleFontSizeChange('10px ')} />
              <label htmlFor="10px  font size"> Large </label>
            {/* </div> */}
          </div>
        </div>
  )
}

export default fontSizeOptions
