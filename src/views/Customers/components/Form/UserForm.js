import React from 'react';
import Model from 'components/Dialog/Dialog';

let AddEditUser = props => {
  return (
    <React.Fragment>
      <Model
        open={props.open}
        title={'test'}
        body={'test'}
        okText={'Submit'}
        cancelText={'Cancel'}
        handleCancel={props.handleCancel}
        handleOk={props.handleOk}
      />
    </React.Fragment>
  );
};

export default AddEditUser;
