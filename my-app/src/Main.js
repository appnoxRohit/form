import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AddUserForm = ({ onSubmit, formData   }) => {
  return (
    
    <form
      className='rounded-lg  '
      onSubmit={(e) => {
        e.preventDefault();
        const formValues = {
          name: e.target.name.value,
          email: e.target.email.value,
          age: e.target.age.value,
          sirname: e.target.sirname.value,
          password: e.target.password.value,
        };
        onSubmit(formValues); // Pass the data to the parent
      }}
    >
      <div className='flex flex-wrap gap-4  '>

      
      <div className=''>
        <label className='block pl-2 ' htmlFor="name">Name:</label>
        <input 
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className='border-2 border-grey-300 pl-2 rounded-md '
          defaultValue={formData.name}
          required
          minLength={3} // Minimum length for name
          maxLength={20} // Maximum length
        />
      </div>

      <div>
        <label className='pl-2' htmlFor="sirname">Sirname:</label>
        <input
          type="text"
          id="sirname"
          name="sirname"
          placeholder="Sirname"
          className='border-2 border-grey-300 pl-2 rounded-md block'
          defaultValue={formData.sirname}
          minLength={3} // Minimum length for sirname
          maxLength={20}
        />
      </div>

      <div>
        <label className='pl-2' htmlFor="age">Age:</label>
        <input 
          type="number"
          id="age"
          name="age"
          placeholder="Age"
          className='border-2 border-grey-300 pl-2 rounded-md block'
          defaultValue={formData.age}
          required
          min={18} 
          max={100} 
        />
      </div>

      <div>
        <label className='pl-2' htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className='border-2 border-grey-300 pl-2 rounded-md block'

          defaultValue={formData.email}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
      </div>

      <div>
        <label className='pl-2' htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className='border-2 border-grey-300 rounded-md pl-2 block'
          defaultValue={formData.password}
          required
          minLength={6} // Password should have a minimum of 6 characters
        />
      </div>

      
      </div>
     
     <div className=' flex mt-3 ml-[650px] '>
      <Button className='w-7 h-10 mt-2 flex justify-end  ' variant="contained" type="submit">
        Submit
      </Button>
      

      </div>
      
    </form>
  );
};

const Main = () => {


  const [isFormVisible, setIsFormVisible] = useState(false);


  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    sirname: '',
    age: '',
    email: '',
    password: '',
  });

  //using these to handle modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [confirm , setConfirm ] = useState(false);
  const confirmationModalOpen = () => setConfirm(true);
  const confirmationModalClose = ()=> setConfirm(false);

  const handleEdit = (i) => {
    setEditIndex(i);
    setFormData(users[i]);
    setIsFormVisible(true);
    handleOpen();
  };

  const handleAddOrUpdateUser = (formData) => {
    if (editIndex !== null) {
      const updateUsers = [...users];
      updateUsers[editIndex] = formData;
      setUsers(updateUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, formData]);
    }
    setFormData({ name: '', sirname: '', age: '', email: '', password: '' });
    setIsFormVisible(false);
    handleClose(); // Close the modal after submission
  };

  const handleDelete = (id) => {
    const newList = users.filter((item, index) => index !== id);
    setUsers(newList);
  };

  //modal styling
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 790, 
    height: 'auto', 
    bgcolor: 'background.paper',
    border: '2px solid #ccc', 
    borderRadius: '12px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
    padding: '32px', 
  };
  
  
  return (
    <div className="w-screen p-5">
      <div className='flex   '>
        <Modal className='border-2 border-red-700 ' open={open} onClose={handleClose}
         aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box  sx={style}>
            <Typography className='flex justify-between ' id="modal-modal-title" variant="h6" component="h2">
              {editIndex !== null ? 'Edit User' : 'Add User'}
              <Button className='flex   ' onClick={()=>handleClose()}> <CancelIcon/> </Button>
              
              


            </Typography>
            <AddUserForm onSubmit={handleAddOrUpdateUser} formData={formData} />
          </Box>
        </Modal>
      </div>

      <div className="flex justify-between w-full">
        <span className=" text-2xl"><strong>USER COUNT:</strong> {users.length}</span>
          <Button 
          onClick={() => {
            setFormData({ name: '', sirname: '', age: '', email: '', password: '' });
            
            setIsFormVisible(!isFormVisible);
            handleOpen();
          }}
          variant="contained"
        >
          {/* {isFormVisible ? 'Cancel' : 'Add User'} */}
        Add User
        </Button>



      </div>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}

      <div className="table w-full mt-10 ">
        <TableContainer component={Paper}>

          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell  width={180} align='center'><strong>NAME</strong> </StyledTableCell>
                <StyledTableCell width={180} align="center"><strong>SIRNAME</strong></StyledTableCell>
                <StyledTableCell width={80} align="center"><strong>AGE</strong></StyledTableCell>
                <StyledTableCell width={250} align="center"><strong>EMAIL</strong></StyledTableCell>
                <StyledTableCell width={100} align="center"><strong>PASSWORD</strong></StyledTableCell>
                <StyledTableCell width={250} align="center"><strong>ACTION</strong></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align='center' component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.sirname}</StyledTableCell>
                  <StyledTableCell align="center">{item.age}</StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">{item.password}</StyledTableCell>
                  <StyledTableCell align="center">
                    <div className='flex justify-around'>
                    <Button variant="outlined" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                    <Button variant="outlined" onClick={ () => handleDelete(index)}>
                      Delete
                    </Button>

                    </div>
                    
                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Main;
