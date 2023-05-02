import useAPI from "../../Hooks/API/useAPI";
import Table from "../../Components/Tables/Table";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import { USER,THEADUSER, ROLES,APIURL } from "../../Assets/Constants";
import { useEffect, useState } from "react";

const AdminMenu = () => {

  const [users,setUsers] = useState([]);
  useRedirect(USER.role, ROLES.ADMIN);
  
  
  useEffect(async ()=>{
    
    await fetch(APIURL.local+"user/getUsers")
    .then((res) => {
      
      const data = res.json()

      setUsers(data.users.map((r)=>({
        fullName: r.fullName,
        userId: r.userId,
        email: r.email,
        userType: r.userType
      })))

    })
    .catch((err) => err );
    

    console.log("loop en adminmenu")
  },[]);
  
  return (
    <div>
      <h2>Users</h2>
      <Table content={users} thead={THEADUSER}/>
    </div>
  );

};

export default AdminMenu;
