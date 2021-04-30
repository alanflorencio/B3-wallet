import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Title from './Title';
import moment from '../layout/moment';
import NumberFormat from 'react-number-format';

const date = new Date();

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const AmountTotal = ({amount}) => {

  const classes = useStyles();
  
  return (
    <React.Fragment>
      <Title>Patrimônio Acumulado</Title>
      <Typography component="p" variant="h4">
        <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'R$'}/>
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {moment(date).format('LL')}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Relatorios
        </Link>
      </div>
    </React.Fragment>
  );
}

export default AmountTotal