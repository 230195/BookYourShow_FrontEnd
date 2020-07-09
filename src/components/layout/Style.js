import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    whiteBackground: {
      background:'white',
    },
    button: {
      margin: theme.spacing(1),
    },
    media: {
      height: 170
  },
  cardContent:{
    overflow: 'hidden',
    overflowY: 'scroll',
  }  
  }));

  export const  useNoUnderLineStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottom: "none"
      },
      "&&:after": {
        borderBottom: "none"
      }
    }
  });