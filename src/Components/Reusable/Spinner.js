import React from 'react';
import {SyncLoader} from 'react-spinners';

const Spinner = (props) => {
  ;

  
  return (
    <SyncLoader color='#ff5555' size={15} loading={props.isLoading}/>
  )
}

export default Spinner
