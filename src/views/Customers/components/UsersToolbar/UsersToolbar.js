import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';
import AddEditUser from '../Form/UserForm';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const { className, ...rest } = props;
  const [value, setValue] = React.useState();
  const [openForm, setOpenForm] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <AddEditUser
        open={openForm}
        handleCancel={() => setOpenForm(false)}
        handleOk={() => setOpenForm(false)}
      />
      <div {...rest} className={clsx(classes.root, className)}>
        <div className={classes.row}>
          <span className={classes.spacer} />

          {/* <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpenForm(true);
            }}>
            Add user
          </Button> */}
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search user by Id, Email or name"
            onChange={e => {
              setValue(e.target.value);
              console.log(e.target.value);
              props.get(undefined, e.target.value);
            }}
            value={value}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
