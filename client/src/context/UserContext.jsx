import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //Get user data from local storage, if there none then sets the user statte to null
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  //Once user are authenticated, store the user data in local storage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    //Whichever states/function we want to use as a global variable(useState), you have to pass it as a value
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;