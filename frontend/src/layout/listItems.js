import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Apartment from '@material-ui/icons/Apartment';
import PaymentIcon from '@material-ui/icons/Payment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import List from '@material-ui/core/List';

function ListItemLink(props) {
	const { icon, primary, to } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

  const classes = useStyles();

	const renderLink = React.useMemo(
		() =>
			React.forwardRef((itemProps, ref) => (
				<RouterLink to={to} ref={ref} {...itemProps} />
			)),
		[to]
	);

	return (
    <ListItem button component={renderLink} className={classes.nested}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
	);
}

function FistItemLink(props) {
  
	const { icon, primary, to } = props;

	const renderLink = React.useMemo(
		() =>
			React.forwardRef((itemProps, ref) => (
				<RouterLink to={to} ref={ref} {...itemProps} />
			)),
		[to]
	);

	return (
    <ListItem button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
	);
}

const MainListItems = () => {

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return(
    <div>

      <FistItemLink 
        to="/"
        primary={'Dashboard'}
        icon={<DashboardIcon />}
      />

      <FistItemLink 
        to="/trader"
        primary={'Day Trader'}
        icon={<QueuePlayNextIcon />}
      />

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <PaymentIcon />
        </ListItemIcon>
        <ListItemText primary="Carteira" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItemLink
            to="/acoes"
            primary={'Ações - BR'}
            icon={<AttachMoneyIcon />}
          />
          <ListItemLink
            to="/acoes-us"
            primary={'Ações - US'}
            icon={<ShoppingCartIcon />}
          />
          <ListItemLink
            to="/caixa"
            primary={'Caixa - RF'}
            icon={<Apartment />}
          />
          <ListItemLink
            to="/crypto"
            primary={'Crypto'}
            icon={<MonetizationOnIcon />}
          />

        </List>
      </Collapse>
  </div>
  )
}

export default MainListItems
