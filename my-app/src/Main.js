import React, { useEffect, useState } from 'react';


const EditForm = ({initialData}) =>{

}

const handleEdit = () =>{
   
}


const AddUserForm = ({ onSubmit }) => {
    return (
      <form className='border-2 border-red-500 rounded-lg'
        onSubmit={(e) => {
          e.preventDefault();
          const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            age: e.target.age.value,
            sirname:e.target.sirname.value,
            password: e.target.password.value,
            action:e.target.action.value,
          };
          onSubmit(formData); // Pass the data to the parent
        }}
      >
       
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder='Name' required />
        </div>

        <div>
          <label htmlFor="sirname">Sirname:</label>
          <input type="text" id="sirname"  name="sirname" placeholder='Sirname' />
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" placeholder=' Age' required />
        </div>
       
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder=' Email' required />
        </div>

        <div>
          <label htmlFor="password">PassWord:</label>
          <input type="star" id="password" name="password" placeholder=' Password' required />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    );
  };

const Main = () => {
    
       
    const [userCount , setUserCount ] = useState(0);

    // function addUser() {
        
        
    // }

    const [isFormVisible ,setIsFormVisible] = useState(false);
    const [users,setUsers]   = useState([]);
    
   

    const handleAddUser = (formData) =>{
        setUsers([...users,formData]);
        setIsFormVisible(false);
        setUserCount(userCount+1); 
    };

    const handleDelete = (id) => {
      debugger
      const newList = users.filter((item, index)=>index !== id);
      console.log("newlist", newList);
      
      setUsers(newList);
    };

    console.log("users", users);
    

  return (
    <div className=' ' >

      <div className='flex space-x-[600px]   w-full'>
        <span className=''>Count : {users.length}</span>
        <button onClick={()=>setIsFormVisible(!isFormVisible)} 
                className='border-2 border-grey-200 rounded-1 flex-end'>
                    {isFormVisible ? "cancel" : "Add User"} </button>
     
      </div>
      {isFormVisible && <AddUserForm onSubmit={handleAddUser}/>}

      <div className='table mt-5 flex-row'>
      <table className="border-collapse border border-slate-400 ...">
      
      <thead>
        <tr>
          <th className='border border-slate-300'>Name</th>
          <th className='border border-slate-300'>Sirname</th>
          <th className='border border-slate-300'>Age</th>
          <th className='border border-slate-300'>Email</th>
          <th className='border border-slate-300'>Password</th>
          <th className='border border-slate-300'>Action</th>


        </tr>
      </thead>
      <tbody>
        {users.map((item, index) => (
          <tr key={index}>
            <td className='border border-slate-300'>{item.name}</td>
            <td className='border border-slate-300'>{item.sirname}</td>
            <td className='border border-slate-300'>{item.age}</td>
            <td className='border border-slate-300'>{item.email}</td>
            <td className='border border-slate-300'>{item.password}</td>
            <td className='border border-slate-300'>
            <button onClick={()=>{setIsFormVisible(!isFormVisible); handleEdit()}} 
                className='border-2 border-grey-200 rounded-1 flex-end'>
                    {isFormVisible ? "cancel" : "edit"} </button>
              <button onClick={()=>handleDelete(index)} className=''>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>


    </div>
  )
}

export default Main