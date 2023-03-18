import React from "react";
import { TLoginData } from "@processes/Login/login_processes/LoginProcess";
import { useGSLAlert } from '../../../../features/GSLAlert';
import { useAPI } from '../../../../shared/API';
import { useTranslations } from '../../../../shared/translations/useTranslations';
import { useAppDispatch } from "@hooks/index";
import { userSlice } from "@store/reducers/UserSlice";

 export const useAuthProcesses = () => {

    const {setUser} = userSlice.actions;
    const {showNotification} = useGSLAlert();
    const {loginUser,resetPassword,changePassword} = useAPI()
    const translatedLogin = useTranslations("Login");
    const dispatch = useAppDispatch();
     
const makeLogin = async (loginData:TLoginData,setErrorCallback:(value:unknown)=>void = null,successCallback:any = null): Promise<void> => {
    
    let resp = await loginUser(loginData);
    const {translate} = translatedLogin;
    const { status, data, response } = resp;
    if (status === 200) {
        //TESTS!!! To cut off
        if(process.env.MODE === "development"){
            document.cookie = "access_token_cookie=123test path='/'"
        }
        //
        setErrorCallback(false);
        showNotification("success",translate("alerts.success"))
        successCallback && successCallback();
        const dummy = {isAuthorized:true};
        dispatch(setUser(dummy))
        return data;
    } else if(!status && response?.status){
        const errorStatus: number = response.status;
        if(errorStatus === 422 || errorStatus === 401){
            showNotification("error",translate("alerts.error"))
            setErrorCallback(true);
            return;
        }
        showNotification("warning",translate("alerts.warning"));
        return;
    }else{
        showNotification("warning",translate("alerts.warning"));
    }
};

const makeRestore = async (payload:string,sendStatusCallback:React.Dispatch<React.SetStateAction<boolean>> = null) => {
    let resp = await resetPassword({email:payload});
    const {translate} = translatedLogin;
    const {status,data,message} = resp;
    if(status === 200){
        showNotification("success",translate("alerts.success"))
        sendStatusCallback && sendStatusCallback(true)
        return data;
    }else{
        showNotification("error",message);
        throw new Error(message);
    }
}

const makeChangePass = async (new_pass:string,confirm_pass:string) => {
    const token = sessionStorage.getItem("change_token");
    console.log(token);
    let resp = await changePassword({new:new_pass,confirm:confirm_pass});
    const {translate} = translatedLogin;
    const {status,data} = resp;
    if(status === 200){
        showNotification("success",translate("alerts.success"))
        return data;
    }else{
        showNotification("error","Request error")
        throw new Error("Request error");
    }
}
return {makeLogin,makeRestore,makeChangePass}
}