import React, { useState } from "react";
import { useGSLAlert } from '../GSLAlert';

const infoIcon = "https://cdn-icons-png.flaticon.com/512/8277/8277564.png";
const warnIcon = "https://cdn-icons-png.flaticon.com/512/595/595067.png";
const errorIcon = "https://cdn-icons-png.flaticon.com/512/2569/2569174.png";
const icons:any = {
    info:infoIcon,
    warn:warnIcon,
    error:errorIcon
};

const useDesktopNotifications = () => {

    const [isSupported,setIsSupported] = useState<boolean>(false)

    const {showNotification} = useGSLAlert();

    const getClientDevice = ():Navigator => {
        if("navigator" in window){
            console.log(window.navigator);
            return window.navigator;
        }
    }
    
    const notifyUser = (body: string,icon:any = null,title:string) => {
        const icn = icons[icon]; 
        const options = {
            body,
            icon:icn
        }
        new Notification(title,options)
    }
    const initNotification = () => {
        console.log(getClientDevice().vendor);
        const {appVersion,vendor}:{appVersion:string,vendor:string} = getClientDevice();
        const isApple = vendor.toLocaleLowerCase().includes("apple");
        if("Notification" in window){
            if(Notification.permission === "denied" || Notification.permission === "default"){
                if(isApple){
                    showNotification("info","Allow notifications","notifications");
                    return;
                }
              return Notification.requestPermission((permission)=>{
                    if(permission === "granted"){
                        return notifyUser("Now you can receive notifications!",infoIcon,"Rights granted!");
                    }
                });
            }else if(Notification.permission === "granted"){
               return notifyUser("Notification body",infoIcon,"Notification title");
            };
        }
        alert("Ваш бровзер не поддерживается. Поставьте хром");
    }


    return{initNotification,notifyUser,isSupported}
}

export default useDesktopNotifications;