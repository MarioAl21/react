import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

import '../styles/Notification.css';

const Notification = (props) => {
  
  const renderIcono = () => {
    
    if(props.notificacionTipo === 'success'){
      console.log("SUCCESS!");
      return(
        <CheckCircleIcon className='icon iconVariant' />
      )
    } else if(props.notificacionTipo === 'error'){
      return(
        <ErrorIcon className='icon iconVariant' />
      )
    } else if(props.notificacionTipo === 'info'){
      return(
        <InfoIcon className='icon iconVariant' />
      )
    } else if(props.notificacionTipo === 'warning'){
      return(
        <WarningIcon className='icon iconVariant' />
      )
    } else if(props.notificacionTipo === 'loader'){
      return(
        <>
          <span className="spinner"></span>
          <img className="logoSpiner" src={logo} alt="Logo" />
        </>
      )
    }
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={props.notificacionOpen}
        autoHideDuration={6000}
        onClose={() => props.setNotificacionOpen(false)}
      >
        <SnackbarContent
          className={props.notificacionTipo}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className='mensaje'>
              <div className='dispFlex'>{renderIcono()}</div>
              <div className='dispFlex'>{props.notificacionMensaje}</div>
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => props.setNotificacionOpen(false)}
            >
              <CloseIcon className='icon' />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </div>
  );
}

export default Notification;