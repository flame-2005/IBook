import React from 'react'

const Alert = (props) => {
    return (
        <div style={{ height: '70px' }}>{props.alert &&
            <div class="alert alert-primary" role="alert">
              <strong>{props.alert.Type} : {props.alert.msg}</strong>
            </div>}
          </div>
    )
}

export default Alert
