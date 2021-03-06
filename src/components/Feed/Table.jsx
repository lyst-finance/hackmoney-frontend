/* eslint-disable */ 

import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
      minWidth: 650,  
    },
  });

const createData = (punkID, priceUSD, priceETH, type, attributeCount, block) => {
    return { punkID, priceUSD, priceETH, type, attributeCount, block };
}

const Feed = ({ feed, usd }) => {
    
    let rows = [];
    const classes = useStyles();

    useEffect(() => {   
        populateTable(feed)
        // eslint-disable-next-line
    },[])

    const populateTable = (transactions) => {

        const filtered = transactions.filter(transaction => transaction.priceInETH != 0)

        rows = filtered.map(event => {
            let priceInUSD = event.priceInETH * usd;
            priceInUSD = priceInUSD.toFixed(2);
            priceInUSD = priceInUSD.toString();
            priceInUSD = '$ '+ priceInUSD; 
            return createData(
                event.punkIndex,
                priceInUSD, 
                event.priceInETH, 
                event.type, 
                event.count,
                event.block)
        });  
    }

    populateTable(feed);

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>punk ID</TableCell>
              <TableCell align="right">price (USD)</TableCell>
              <TableCell align="right">price (ETH)</TableCell>
              <TableCell align="right">type&nbsp;</TableCell>
              <TableCell align="right">attribute count&nbsp;</TableCell>
              <TableCell align="right">block #&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {row.punkID}
                </TableCell>
                <TableCell align="right">{row.priceUSD}</TableCell>
                <TableCell align="right">{row.priceETH}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.attributeCount}</TableCell>
                <TableCell align="right">{row.block}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> 
      </TableContainer>
    )
}

export default Feed
