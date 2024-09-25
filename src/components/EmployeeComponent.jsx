import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService';
import { useNavigate,useParams } from 'react-router-dom';

const EmployeeComponent = () => {

    const [firstName,setFirstName]=useState('');
    const [lastName,setlastName]=useState('');
    const [email,setEmail]=useState('');
    const {id}=useParams();

    const [errors,setErrors]=useState(
        {
            firstName:'',
            lastName:'',
            email:''
        }
    )
    useEffect(()=>{
       if(id){
        getEmployee(id).then((response)=>{
            setFirstName(response.data.firstName);
            setlastName(response.data.lastName);
            setEmail(response.data.email);

        }).catch(error=>{
            console.log(error)
        })
       }
    },[id])
    function pageTitle(){
        if(id){
         return             <h2 className='text-center'>Update Employee</h2>

        }
        else{
            return             <h2 className='text-center'>Add Employee</h2>

        }
     }
     
     
    function validateForm(){
        let valid=true;
        const errorCopy={...errors};
        if(firstName.trim()){
            errorCopy.firstName='';
        }
        else{
            errorCopy.firstName='First name is required';
            valid=false;
        }
        if(lastName.trim()){
            errorCopy.lastName='';
        }
        else{
            errorCopy.lastName='Last name is required';
            valid=false;
        }
        if(email.trim()){
            errorCopy.firstName='';
        }
        else{
            errorCopy.email='Email is required';
            valid=false;
        }
     setErrors(errorCopy);
     return valid;

    }
    const navigator=useNavigate();
    function saveOrUpdateEmployee(e){
     e.preventDefault();
     if(validateForm()){
        if(id){
        const employee={firstName,lastName,email}
        console.log(employee);
        updateEmployee(id,employee).then((response) => {
           console.log(response.data);
           navigator('/employees')
         }).catch(error=>{
            console.log(error)
        });   
        }
        else{
            const employee={firstName,lastName,email}
            console.log(employee);
            createEmployee(employee).then((response) => {
               console.log(response.data);
               navigator('/employees')
             }).catch(error=>{
                console.log(error)
            });   
            }
     
        }
    }      
  return (
    <div className='container' >
        <br/>
        <br/>
     <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
            {pageTitle()}
            <div className='card-body'>
                <form>
                    <div className='form-group mb-2'>
                        <label className='form-label'>First Name</label>
                        <input className={`form-control ${errors.firstName? 'is-invalid':''}`}
                        type='text'
                        placeholder='Enter Employee First Name'
                        name='firstName'
                        onChange={(e)=>setFirstName(e.target.value)}
                        value={firstName}
                        ></input>
                        {errors.firstName &&<div className='invalid-feedback'>{errors.firstName}</div>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Last Name</label>
                        <input className={`form-control ${errors.lastName? 'is-invalid':''}`}
                        type='text'
                        placeholder='Enter Employee Last Name'
                        name='lastName'
                        onChange={(e)=>setlastName(e.target.value)}
                        value={lastName}
                        ></input>
                    {errors.lastName &&<div className='invalid-feedback'>{errors.lastName}</div>}

                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Email</label>
                        <input className={`form-control ${errors.email? 'is-invalid':''}`}
                        type='text'
                        placeholder='Enter Employee Email'
                        name='email'
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        ></input>
                     {errors.email &&<div className='invalid-feedback'>{errors.email}</div>}
                    </div>
                  <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                </form>
            </div>
        </div>
     </div>
    </div>
  )
}

export default EmployeeComponent