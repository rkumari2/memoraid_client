import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import * as actions from '../../actions/accessibility';
import * as actions from '../../accessibility-redux/actions'
import './style.css'

const Settings = () => {

  const { bgColor, spacing, lineSpacing, size } = useSelector((state) => state.accessibility);

  const dispatch = useDispatch();

  const handleBgChange = (color) => {
    dispatch(actions.setBgColor(color));
    localStorage.setItem('bgColor', color);
  };

  const handleSpacingChange = (spacing) => {
    dispatch(actions.setLetterSpacing(spacing));
    localStorage.setItem('spacing', spacing);
  };

  const handleLineHeightChange = (lineSpacing) => {
    dispatch(actions.setLineSpacing(lineSpacing));
    localStorage.setItem('lineSpacing', lineSpacing);
  }

  const handleFontSizeChange = (size) => {
    dispatch(actions.setFontSize(size))
    localStorage.setItem('size', size);
  }

  useEffect(() => {
    const savedBgColor = localStorage.getItem('bgColor');
    const savedSpacing = localStorage.getItem('spacing');
    const savedLineSpacing = localStorage.getItem('lineSpacing');
    const savedSize = localStorage.getItem('size');

    if (savedBgColor) {
      handleBgChange(savedBgColor);
    }
    if (savedSpacing) {
      handleSpacingChange(savedSpacing);
    }
    if (savedLineSpacing) {
      handleLineHeightChange(savedLineSpacing);
    }
    if (savedSize) {
      handleFontSizeChange(savedSize);
    }
  }, []);

  useEffect(() => {
    // document.body.style.backgroundColor = bgColor;
    const element = document.getElementById('accessibility')
    if(element) {
      element.style.backgroundColor = bgColor
    }
    document.body.style.letterSpacing = spacing;
    document.body.style.lineHeight = lineSpacing;
    document.body.style.fontSize = size;
  }, [bgColor, spacing, lineSpacing, size]);

  return (
    <div className='page-layout'>
    <img className='bg-image' src="favicon.png" alt="light bulb graphic" />

      <div className='settings-cont'>
        <h1> Settings </h1>

        <div className='settings-output-cont'>

          {/* font size */}
          <div className='setting-box'>
          <h2> Font size </h2>
          <div className='radio-btns-cont'>
            <div>
              <input
                type="radio"
                name='font-size'
                value='16px'
                checked={size === '16px'}
                onChange={() => handleFontSizeChange('16px')} />
              <label htmlFor="16px font size"> Small </label>
            </div>

            <div>
              <input
                type="radio"
                name='font-size'
                value='17px'
                checked={size === '17px'}
                onChange={() => handleFontSizeChange('17px')} />
              <label htmlFor="17px font size"> Medium </label>
            </div>

            <div>
              <input
                type="radio"
                name='font-size'
                value='20px'
                checked={size === '20px'}
                onChange={() => handleFontSizeChange('20px')} />
              <label htmlFor="20px font size"> Large </label>
            </div>
          </div>
          </div>

          {/* line height */}
          <div className='setting-box'>
          <h2>Line height</h2>
          <div className='radio-btns-cont'>
            <div>
              <input
                type="radio"
                name='line-height'
                value='1.5rem'
                checked={lineSpacing === '1.5rem'}
                onChange={() => handleLineHeightChange('1.5rem')} />
              <label htmlFor=" 1.5rem height"> Small </label>
            </div>

            <div>
              <input
                type="radio"
                id='1.75rem'
                name='line-height'
                value='1.75rem'
                checked={lineSpacing === '1.75rem'}
                onChange={() => handleLineHeightChange('1.75rem')} />
              <label htmlFor="1.75rem height"> Medium </label>
            </div>

            <div>
              <input
                type="radio"
                id='2rem'
                name='line-height'
                value='2rem'
                checked={lineSpacing === '2rem'}
                onChange={() => handleLineHeightChange('2rem')} />
              <label htmlFor="2rem height"> Large </label>
            </div>
          </div>
        </div>

        {/* letter spacing */}
        <div className='setting-box'>
          <h2>Letter spacing</h2>
            <div className='radio-btns-cont'>
              <div>
              <input
                type="radio"
                id="0.1rem"
                name="letter-spacing"
                value="0.05rem"
                checked={spacing === '0.05rem'}
                onChange={() => handleSpacingChange('0.05rem')}
              />
              <label htmlFor="0.05 spacing"> Small </label>
            </div>

            <div>
              <input
                type="radio"
                id="0.15rem"
                name="letter-spacing"
                value="0.1rem"
                checked={spacing === '0.1rem'}
                onChange={() => handleSpacingChange('0.1rem')}
              />
              <label htmlFor="0.1 spacing"> Medium </label>
            </div>

            <div>
              <input
                type="radio"
                id="0.2rem"
                name="letter-spacing"
                value="0.15rem"
                checked={spacing === '0.15rem'}
                onChange={() => handleSpacingChange('0.15rem')}
              />
              <label htmlFor="0.15 spacing"> Large </label>
            </div>
            </div>
        </div>

        {/* background color */}
        <div className='setting-box'>
          <h2>Background color</h2>
          <div className='radio-btns-cont'>
          <div>
              <input
                type="radio"
                name="background-color"
                value="#efffd0"
                checked={bgColor === '#efffd0'}
                onChange={() => handleBgChange('#efffd0')}
              />
              <label htmlFor="default colour"> Default </label>
          </div>

          <div>
              <input
                type="radio"
                name="background-color"
                value="#B987DC"
                checked={bgColor === '#B987DC'}
                onChange={() => handleBgChange('#B987DC')}
              />
              <label htmlFor="purple"> Purple </label>
          </div>

          {/* <div>
              <input
                type="radio"
                name="background-color"
                value="#BD987DC"
                checked={bgColor === '#BD987DC'}
                onChange={() => handleBgChange('#BD987DC')}
              />
              <label htmlFor="purple colour"> Purple </label>
          </div> */}

            <div>
              <input
                type="radio"
                name="background-color"
                value="#ffffff"
                checked={bgColor === '#ffffff'}
                onChange={() => handleBgChange('#ffffff')}
              />
              <label htmlFor="color-white"> White </label>
            </div>

            <div>
              <input
                type="radio"
                id="color-blue"
                name="background-color"
                value="#96ADFC"
                checked={bgColor === '#96ADFC'}
                onChange={() => handleBgChange('#96ADFC')}
              />
              <label htmlFor="color-blue"> Blue </label>
            </div>

            <div>
              <input
                type="radio"
                id="color-blue"
                name="background-color"
                value="#DBE1F1"
                checked={bgColor === '#DBE1F1'}
                onChange={() => handleBgChange('#DBE1F1')}
              />
              <label htmlFor="color-blue"> Blue-Grey </label>
            </div>

            <div>
              <input
                type="radio"
                id="color-yellow"
                name="background-color"
                value="#F8FD89"
                checked={bgColor === '#F8FD89'}
                onChange={() => handleBgChange('#F8FD89')}
              />
              <label htmlFor="color-yellow"> Yellow </label>
            </div>

            <div>
              <input
                type="radio"
                id="color-peach"
                name="background-color"
                value="#EDD1B0"
                checked={bgColor === '#EDD1B0'}
                onChange={() => handleBgChange('#EDD1B0')}
              />
              <label htmlFor="color-peach"> Peach </label>
            </div>

            {/* <div>
              <input
                type="radio"
                id="color-green"
                name="background-color"
                value="#D8FFC1"
                checked={bgColor === '#D8FFC1'}
                onChange={() => handleBgChange('#D8FFC1')}
              />
              <label htmlFor="color-green"> Green </label>
            </div> */}

            {/* <div>
              <input
                type="radio"
                id="color-pink"
                name="background-color"
                value="#FFD4EA"
                checked={bgColor === '#FFD4EA'}
                onChange={() => handleBgChange('#FFD4EA')}
              />
              <label htmlFor="color-pink"> Pink </label>
            </div> */}

            <div>
              <input
                type="radio"
                id="color-orange"
                name="background-color"
                value="#EDDD6E"
                checked={bgColor === '#EDDD6E'}
                onChange={() => handleBgChange('#EDDD6E')}
              />
              <label htmlFor="color-orange"> Orange </label>
            </div>
          </div>
        </div>


        </div>

      </div>

    </div>
  )
}

export default Settings
