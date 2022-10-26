import { FC, useState, useEffect, useCallback } from "react";
import { User, Message, MessageType } from "../../models";
import { FormInput } from "../components/FormInput";
import { Button, Spin} from "antd";
import { GSpinner } from "../components/GSpinner";
import useUsersContractState from "../../utils/sm/hooks/useUsersContractState";
import usePage from "../../utils/sm/hooks/usePage";
import { Page } from "../../models";
import { InfoCircleTwoTone } from "@ant-design/icons";
import './css/UserForm.css';

export enum UserFormType {

    Edit = 1,

    Create = 2,

    View = 3,
}

interface Props {

    formType? : UserFormType,

    title? : string, 

    buttonTitle? : string, 

    cancelAction? : () => void, 
}

export const UserForm : FC <Props> = ({
    formType, title, cancelAction, buttonTitle
}) =>{

    const [user,setUser] = useState<User>({});

    const [message, setMessage] = useState<Message>();

    const {signUpUser, loading, getUser, updateUser} = useUsersContractState();

    const {setPage} = usePage();

    const createProfileNow = async () =>{
        setMessage(undefined);

        if ( user.first_name === undefined || user.first_name?.trim() === "") {
            setMessage({ text :"First name cannot be blank", type : MessageType.Error});
            return;
        }

        if ( user.last_name === undefined || user.last_name?.trim() === "") {
            setMessage({ text :"Last name cannot be blank", type : MessageType.Error});
            return;
        }

        await signUpUser(user,(e)=>{

            if (e instanceof Error){
                setMessage({ text :e.message, type : MessageType.Error});
            }
            else {
                setMessage({ text : "Success!", type : MessageType.Info});
            }

        });
    }


    const updateProfileNow = async () =>{

        if ( user.first_name === undefined || user.first_name?.trim() === "") {
            setMessage({ text :"First name cannot be blank", type : MessageType.Error});
            return;
        }

        if ( user.last_name === undefined || user.last_name?.trim() === "") {
            setMessage({ text :"Last name cannot be blank", type : MessageType.Error});
            return;
        }

        await updateUser(user,(e)=>{

            if (e instanceof Error){
                setMessage({ text :e.message, type : MessageType.Error});
            }
            else {
                setMessage({ text : "Success!", type : MessageType.Info});
            }

        });
    }


    const createOrUpdate = async () =>{
        if ( formType && formType === UserFormType.Edit) {

            await updateProfileNow();
        }
        else {

            await createProfileNow();
        }
    }

    const fetchUserForEditMode = useCallback(async ()=>{
        if ( formType === UserFormType.Edit ){
            let u = await getUser();
            if ( u ) {
                setUser(u);
            }
            else {
                setMessage({ text : "Profile Not Created!", type : MessageType.Error});
                setTimeout(()=>{
                    setPage(Page.Home);
                }, 1000);
            }
        }
    },[formType]);

    useEffect(()=>{
        fetchUserForEditMode();
    },[]);


    return <div className="createUserForm">
       {(message || loading) && <div style={{color: message?.type === MessageType.Error ? "red" : "#346",
       background:"#ccd",padding:"10px",borderRadius:"16px"}}>
        {loading ? <><GSpinner/></> : <>{message?.text}</>}
        </div>}
        <table style={{width:"95%"}} cellPadding={5} cellSpacing={5}>
            <thead>
                <tr>
                    <td colSpan={2} style={{fontWeight:"bolder",width:"100%"}}>{
                        title ? title : <><InfoCircleTwoTone style={{marginRight:"4px"}}/> Please Create Your User Profile</>
                    }
                    </td>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{width:"30%",fontWeight:"bolder"}} valign="top">
                First Name
                </td>
                <td style={{width:"70%",fontWeight:"bolder"}}>
                <FormInput style={{minWidth:"120px"}} value={user.first_name} onChange={(e)=>{
                    setUser({...user, first_name : e.target.value });
                }}/>
                </td>
            </tr>
            <tr>
                <td style={{width:"30%",fontWeight:"bolder"}} valign="top">
                Last Name
                </td>
                <td style={{width:"70%",fontWeight:"bolder"}}>
                <FormInput style={{minWidth:"120px"}} value={user.last_name} onChange={(e)=>{
                    setUser({...user, last_name : e.target.value });
                }}/>
                </td>
            </tr>
            <tr>
                <td style={{width:"30%",fontWeight:"bolder"}} valign="top">
                Email (Optional)
                </td>
                <td style={{width:"70%",fontWeight:"bolder"}}>
                <FormInput style={{minWidth:"160px"}} value={user.email} onChange={(e)=>{
                    setUser({...user, email : e.target.value });
                }}/>
                </td>
            </tr>
            <tr>
                <td style={{width:"30%",fontWeight:"bolder"}} valign="top">
                Profile Image (Optional)
                </td>
                <td style={{width:"70%",fontWeight:"bolder",textAlign:"left"}}>
                </td>
            </tr>
            <tr>
                <td colSpan={2} style={{width:"100%",textAlign:"center"}}>
                    <Button className="createButt" disabled={loading} onClick={async ()=>{
                        await createOrUpdate();
                    }}>{buttonTitle ? buttonTitle : "Create Profile Now"} {loading ? <Spin size="small" style={{marginLeft:"6px"}}/> : <></>}</Button>

                    { cancelAction && <Button className="cancelButt" disabled={loading} onClick={()=>{
                        cancelAction();
                    }}>Cancel</Button>}
                  
                </td>
            </tr>
            </tbody>

        </table>
    </div>
}