import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { FooterBanner , HeroBanner} from "../components";



const Home = () => {
  //Getting the user value from the UserContext
  const { user } = useContext(UserContext);

  return (
    <div>
   <HeroBanner />
<br />
      <h1>{user ? `Welcome ${user.username}` : "BEST WAY TO OWN YOUR NIKE"}</h1>

      <FooterBanner />
    </div>
  );
};
export default Home;