import React from "react";
import  {FaWindowClose} from 'react-icons/fa';
import {UserContext} from '../context/userContexts';

export default function Alert() {
  const {alert, hideAlert} = React.useContext(UserContext);

  let css = 'alert-container';
  if(alert.show){
    css += " alert-show ";

    if(alert.type === 'danger'){
      css += " alert-danger"
    }
  }

  return <div className={css}><div>
    <p>{alert.show && alert.msg}</p>
    <button className="alert" onClick={hideAlert}><FaWindowClose/></button>
    </div></div>;
}
