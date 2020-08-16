import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(props.size));

  React.useEffect(() => {
    console.log('in the useEffect')
    if (props.open != open) {
      handleClick(props.open);
      console.log('opening..')
    }
  }, [props]);
  const handleClick = (open) => {
    setOpen(open);
  };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        fullWidth
        onClose={props.handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleCancel} color="primary">
            {props.cancelText}
          </Button>
          <Button onClick={props.handleOk} color="primary" autoFocus>
            {props.okText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
