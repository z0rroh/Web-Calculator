import React from 'react';
import PropTypes from 'prop-types';
import './Key.css'

const Key = ({ keyType, keyValue, keyAction}) => {

   return(
      <div 
         onClick={() => keyAction(keyValue)}
         className={`key-container ${keyType}`}>
         <p className="key-value">
            { keyValue }
         </p>
      </div>
   )
}

Key.propTypes = {
   keyAction: PropTypes.func.isRequired,
   keyType: PropTypes.string.isRequired,
   keyValue: PropTypes.string.isRequired
}

export default Key