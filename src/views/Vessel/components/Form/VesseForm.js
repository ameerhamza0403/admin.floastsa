import React from 'react';
import Model from 'components/Dialog/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import * as fn from '../../../../common/variables/constants';
import { BackDrop } from 'components';
import * as firebase from 'firebase';
import UsersTable from './UsersTable';

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

  React.useEffect(() => {
    if (props.data.userId) {
      getVesselsData();
    }
  }, [props.data]);

  let getVesselsData = async () => {
    const data = await firebase
      .firestore()
      .collection('Vessel')
      .where('userId', '==', props.data.userId)
      .get();
    let arr = [];
    data.forEach(e => arr.push(e));
    setVessels(arr);
  };

  return (
    <React.Fragment>
      {open && <BackDrop open={true} />}
      <Model
        className={classes.modal}
        open={props.open}
        title={'Vessel Details'}
        // size={'lg'}
        handleOk={async () => {
          // setOpen(true);
          // await firebase
          //   .firestore()
          //   .collection('Users')
          //   .doc(props.data.userId)
          //   .update({
          //     userType: 'seller'
          //   });
          // props.get();

          // setOpen(false);
          props.close();
        }}
        handleCancel={() => {
          props.close();
        }}
        okText={'OK'}
        cancelText={'Back'}
        body={
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="About"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.aboutbio}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="HIN"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.hin}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ID"
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
                  label="Inpection Date"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.inspectiondate}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Re Inpection Date"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.reinspectiondate}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vessel Insaurance"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.vesselInsurance}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Marine Radio"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.marinRadio? 'Yes': 'No'}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Maximum Passangers"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.maxpassengers}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Number of Berths"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.numOfBerths}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Registration Number"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.registrationNumber}
                  className={classes.TextField}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <br />
              <h2>Vessels Images</h2>
              {props.data.images && props.data.images.map(e => (
                <Grid item xs={12}>
                  <img src={e} width={'100%'} height={'auto'} />
                </Grid>
              ))}
            </Grid>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default AddEditUser;
