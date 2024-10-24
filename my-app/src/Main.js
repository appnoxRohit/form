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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

const AddUserForm = ({ onSubmit, formData }) => {
  return (
    <form
      className='rounded-lg'
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
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          defaultValue={formData.name}
          required
          minLength={3} // Minimum length for name
          maxLength={20} // Maximum length
        />
      </div>

      <div>
        <label htmlFor="sirname">Sirname:</label>
        <input
          type="text"
          id="sirname"
          name="sirname"
          placeholder="Sirname"
          defaultValue={formData.sirname}
          minLength={3} // Minimum length for sirname
          maxLength={20}
        />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Age"
          defaultValue={formData.age}
          required
          min={18} // Minimum age should be 18
          max={100} // Set max age if necessary
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          defaultValue={formData.email}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Basic email pattern validation
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          defaultValue={formData.password}
          required
          minLength={6} // Password should have a minimum of 6 characters
        />
      </div>

      <Button variant="outlined" type="submit">
        Submit
      </Button>
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
    width: 600, // Increased width
    height: 'auto', // Allow height to adjust based on content
    bgcolor: 'background.paper',
    border: '2px solid #ccc', // Lighter border color
    borderRadius: '12px', // Add rounded corners
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Softer shadow effect
    padding: '32px', // Larger padding
  };
  

  return (
    <div className="w-screen">
      <div>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {editIndex !== null ? 'Edit User' : 'Add User'}
            </Typography>
            <AddUserForm onSubmit={handleAddOrUpdateUser} formData={formData} />
          </Box>
        </Modal>
      </div>

      <div className="flex space-x-[1200px] w-full">
        <span className="pl-10 text-2xl">USER COUNT: {users.length}</span>
        <Button
          onClick={() => {
            setFormData({ name: '', sirname: '', age: '', email: '', password: '' });
            setIsFormVisible(!isFormVisible);
            handleOpen();
          }}
          variant="contained"
        >
          {isFormVisible ? 'Cancel' : 'Add User'}
        </Button>
      </div>

      <div className="table w-full mt-10 border-2 border-red-400">
        <TableContainer component={Paper}>

          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Sirname</StyledTableCell>
                <StyledTableCell align="center">Age</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">PassWord</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.sirname}</StyledTableCell>
                  <StyledTableCell align="center">{item.age}</StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">{item.password}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="outlined" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                    <Button variant="outlined" onClick={() => handleDelete(index)}>
                      Delete
                    </Button>
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
