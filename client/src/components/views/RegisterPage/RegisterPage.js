import moment from "moment";
import { registerUser } from "../../../_actions/user_actions";
import React, { useEffect, useState } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, CardActions, makeStyles, createStyles, CardContent, CardHeader, Card, TextField } from "@material-ui/core";


const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  }),
);


const Register = (props) => {

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('12345678');
  const [firstname, setFirstname] = useState('true');
  const [lastname, setLastname] = useState('xxx');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');


  useEffect(() => {
    console.log(props);
    const { errors, registerStatus } = props;
    if (!errors && registerStatus==='success') {
      props.history.push("/");
    } else {
      setError(errors)
    }

  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataToSubmit = {
      email,
      password,
      firstname,
      lastname,
      // image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
    };

    props.registerUser(dataToSubmit).then(d => console.log(d)
    );
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      // isButtonDisabled || handleSubmit();
    }
  };

  return (
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Login App" />
          <CardContent>
            <div>

              <TextField
                error={error}
                fullWidth
                id="firstname"
                type="text"
                label="firstname"
                placeholder="firstname"
                margin="normal"
                onChange={(e) => setFirstname(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />

              <TextField
                error={error}
                fullWidth
                id="lastname"
                type="text"
                label="lastname"
                placeholder="lastname"
                margin="normal"
                onChange={(e) => setLastname(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />

              <TextField
                error={error}
                fullWidth
                id="email"
                type="email"
                label="email"
                placeholder="email"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />

              <TextField
                error={error}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={helperText}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />

              <TextField
                error={error}
                fullWidth
                id="confirmPassword"
                type="password"
                label="confirmPassword"
                placeholder="confirmPassword"
                margin="normal"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />

            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              onClick={(e) => handleSubmit(e)}
            >
              Register
          </Button>
          </CardActions>
        </Card>
      </form>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    registerStatus: state.user.registerStatus,
    errors: state.user.error
  };
};

const mapDispatchToProps = {
  registerUser
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
