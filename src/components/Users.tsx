import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";

import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";

import TableContainer from "@material-ui/core/TableContainer";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";

import { UsersInterface } from "../models/IUser";


import moment from 'moment';


 

const useStyles = makeStyles((theme: Theme) =>

 createStyles({

   container: {marginTop: theme.spacing(2)},

   table: { minWidth: 650},

   tableSpace: {marginTop: 20},

 })

);

 

function Users() {

 const classes = useStyles();

 const [users, setUsers] = React.useState<UsersInterface[]>([]);

 

 const getUsers = async () => {

   const apiUrl = "http://localhost:8080/users";

   const requestOptions = {

     method: "GET",

     headers: { "Content-Type": "application/json" },

   };

 

   fetch(apiUrl, requestOptions)

     .then((response) => response.json())

     .then((res) => {

       console.log(res.data);

       if (res.data) {

         setUsers(res.data);

       } else {

         console.log("else");

       }

     });

 };

 

 useEffect(() => {

   getUsers();

 }, []);

 

 return (

   <div>

     <Container className={classes.container} maxWidth="md">

       <Box display="flex">

         <Box flexGrow={1}>

           <Typography

             component="h2"

             variant="h6"

             color="primary"

             gutterBottom

           >

             Users

           </Typography>

         </Box>

         <Box>

           <Button

             component={RouterLink}

             to="/create"

             variant="contained"

             color="primary"

           >

             Create User

           </Button>

         </Box>

       </Box>

       <TableContainer component={Paper} className={classes.tableSpace}>

         <Table className={classes.table} aria-label="simple table">

           <TableHead>

             <TableRow>

               <TableCell align="center" width="5%">

                 ID

               </TableCell>

               <TableCell align="center" width="25%">

                 First

               </TableCell>

               <TableCell align="center" width="25%">

                 Last

               </TableCell>

               <TableCell align="center" width="5%">

                 Age

               </TableCell>

               <TableCell align="center" width="20%">

                 Email

               </TableCell>

               <TableCell align="center" width="20%">

                 Birth Day

               </TableCell>

             </TableRow>

           </TableHead>

           <TableBody>

             {users.map((user: UsersInterface) => (

               <TableRow key={user.ID}>

                 <TableCell align="right">{user.ID}</TableCell>

                 <TableCell align="left" size="medium">

                   {user.FirstName}

                 </TableCell>

                 <TableCell align="left">{user.LastName}</TableCell>

                 <TableCell align="left">{user.Age}</TableCell>

                 <TableCell align="left">{user.Email}</TableCell>

                 <TableCell align="center">{moment(user.BirthDay).format("DD/MM/YYYY")}</TableCell>

               </TableRow>

             ))}

           </TableBody>

         </Table>

       </TableContainer>

     </Container>

   </div>

 );

}

 

export default Users;