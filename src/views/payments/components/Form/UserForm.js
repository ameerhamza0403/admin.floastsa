import React from 'react';
import Model from 'components/Dialog/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import * as fn from '../../../../common/variables/constants';
import { BackDrop } from 'components';
import * as firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  },
  TextField: {
    minWidth: '100%'
  }
}));

let AddEditUser = props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [vessels, setVessels] = React.useState([]);
  console.log(props);

  const [cash, setCash] = React.useState('');
  const [monthly, setMonthly] = React.useState('');

  React.useEffect(() => {
    setCash(props.data.cash);
    setMonthly(props.data.monthly);
  }, [props.data]);

  return (
    <React.Fragment>
      {open && <BackDrop open={true} />}
      <Model
        className={classes.modal}
        open={props.open}
        title={'Payments Details'}
        // size={'lg'}
        handleOk={async () => {
          setOpen(true);
          await firebase
            .firestore()
            .collection('funds')
            .doc(props.data.id)
            .update({
              cash: cash,
              monthly: monthly
            });
          props.get();

          setOpen(false);
          props.close();
        }}
        handleCancel={() => {
          props.close();
        }}
        okText={'Save'}
        cancelText={'Back'}
        body={
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="Id"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.id}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Life Time Earning"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.total}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Earning this Month"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  onChange={e => setMonthly(e.target.value)}
                  // defaultValue={props.data.monthly}
                  value={monthly}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Cash This month"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  onChange={e => setCash(e.target.value)}
                  // defaultValue={props.data.cash}
                  value={cash}
                  className={classes.TextField}
                />
              </Grid>
            </Grid>
            <br />
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default AddEditUser;
