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
    data.forEach(e => arr.push(e.data()));
    setVessels(arr);
  };

  return (
    <React.Fragment>
      {open && <BackDrop open={true} />}
      <Model
        className={classes.modal}
        open={props.open}
        title={'Operator/Skipper Details'}
        // size={'lg'}
        handleOk={async () => {
          setOpen(true);
          await firebase
            .firestore()
            .collection('Users')
            .doc(props.data.userId)
            .update({
              userType: 'seller'
            });
            await firebase
            .firestore()
            .collection('funds')
            .doc(props.data.userId)
            .set({
              id: props.data.userId,
              monthly:'',
              total: '',
              cash: ''
            });
          props.get();

          setOpen(false);
          props.close();
        }}
        handleCancel={() => {
          props.close();
        }}
        okText={'Accept Request'}
        cancelText={'Back'}
        body={
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.name}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label=" ID"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.id}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phome"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.phone}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.email}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Mobile"
                  size="small"
                  id="outlined-size-small"
                  variant="outlined"
                  // onChange={e => setGasName(e.target.value)}
                  value={props.data.mobile}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Type"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.operatorType}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Police Clearance"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.police}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Public CLI"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.publicCLI}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Skipper"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.skipper}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Yellow Card"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.yelllowcard}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Blue Card"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.bluecard}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="About"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.about}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Driver"
                  size="small"
                  // type="number"
                  id="outlined-size-small"
                  variant="outlined"
                  value={props.data.driver}
                  // onChange={e => setOctRating(e.target.value)}
                  className={classes.TextField}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <br />
              <h2>Vessels</h2>
              <UsersTable users={vessels} />
            </Grid>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default AddEditUser;
