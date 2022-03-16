import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      margin: theme.spacing(1, 'auto'),
    },
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  otpButton: {
    margin: theme.spacing(2, 0, 2),
    '& .MuiButton-label': {
      postion: 'relative',
    },
  },
}));
