import Sets from './Sets';
import FourOhFour from './FourOhFour';
import Home from './Home';
import HomeIcon from '@material-ui/icons/Home';
import {loadData} from '../../../data/Helpers';

const Routes = [
  {
    id: 0,
    path: '/',
    name: 'Home',
    component: Home,
    exact: true,
    Icon: HomeIcon,
    display: true,
    loadData: null,
  },
  {
    id: 1,
    path: '/sets',
    name: 'Sets',
    component: Sets,
    Icon: false,
    display: true,
    loadData: () => loadData('allSets{id,name,image{width,height,url}}'),
  },
  {
    id: 2,
    display: false,
    path: '',
    component: false,
    icon: false,
    loadData: null,
  },
  {
    id: 3,
    display: false,
    path: '*',
    component: FourOhFour,
    Icon: false,
    loadData: null,
  },
];


export default Routes;
