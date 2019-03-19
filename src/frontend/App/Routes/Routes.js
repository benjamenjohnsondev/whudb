import Sets from './Sets';
import FourOhFour from './FourOhFour';
import Home from './Home';
import HomeIcon from '@material-ui/icons/Home';

const Routes = [
  {
    id: 0,
    path: "/",
    name: 'Home',
    component: Home,
    exact: true,
    Icon: HomeIcon,
    display: true,
  }, {
    id: 1,
    path: "/sets",
    name: 'Sets',
    component: Sets,
    Icon: false,
    display: true,
  }, {
    id: 2,
    display: false,
    path: "",
    component: false,
    icon: false
  }, {
    id: 3,
    display: false,
    path: '*',
    component: FourOhFour,
    Icon: false
  }
];


export default Routes;
