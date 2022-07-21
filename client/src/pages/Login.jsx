import { useState, useContext} from 'react';

import { authAxios } from "../customAxios/authAxios";
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";





const Login = () => {
  const defaultFormData = {
    username: '',
    password: '',
    showPassword: false,
  };
  //Getting setUser function from UserContext to update the of user
  const { user, setUser } = useContext(UserContext);
  //This function will help us to navigate between routes
  const navigateTo = useNavigate();

  const [loginState, setLoginState] = useState('login');

  const [formData, setFormData] = useState(defaultFormData);

  


  //Updating the user value from input field
  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitFormData = async () => {
    try {
      const { data } = await authAxios.post(
        `http:localhost:5005/ ${loginState}`,
        formData
      );
      setUser(() => data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    submitFormData();
    navigateTo("/products");
  };

  const logoutHandler = (e) => {
    setUser(() => null);
  };
  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return user ? (
    <div>
      <button className="btn" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  ) : (
    <div>
      <h1>{loginState}</h1>
      <p>Please Register and/or Login</p>
      <button className="btn" onClick={() => setLoginState("login")}>
        Login
      </button>
      <br />
      <button className="btn" onClick={() => setLoginState("register")}>
        Register
      </button>
      <form onSubmit={submitHandler} style={{ textAlign: "center" }}>
        <InputLabel className="required">username</InputLabel>
        <Input
          type={formData.showEmail ? "text" : "email"}
          name="username"
          onChange={changeHandler}
          value={formData.email}
        />
        <InputLabel className="required">Password</InputLabel>
        <Input
          type={formData.showPassword ? "text" : "password"}
          name="password"
          onChange={changeHandler}
          value={formData.password}
          endAdornment={
            <InputAdornment position="center">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {formData.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <br />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};
export default Login; 