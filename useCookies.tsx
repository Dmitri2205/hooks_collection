import React, { useState,useEffect } from "react";

interface ICookiesParams {
    exp: string | Date | number,
    max_age: number,
    access_token: string | unknown,
    c_name: any,
    expires_in:number
}

export const useCookies = () => {

    const [cookiesExist, setCookiesExist] = useState<boolean>(false);
    const cookiesNames = ["access_token_cookie","lang","refresh_token_cookie","csrf_access_token","csrf_refresh_token"];

    useEffect(()=>{
      !cookiesExist && initCookies(); 
    },[])
    
    const initCookies = () => {
        const cookies = document.cookie.split(";");
        cookiesNames.forEach((name)=>{
          let existing = cookies.find((cookie)=>{
            let [cookieName,cookieValue] = cookie.split("="); 
            return cookieName.trim() === name && cookieValue.length > 0;
          });
          if (existing){
            setCookiesExist(true);
            return
          }else{
            document.cookie = `${name}=; path=/; `;
        }
    })
}

const getCookieValue = (cookieName:string) => {
  const cookies = document.cookie.split(";");
  const result = cookies.find((cookie,i)=>{
  const [name,value] = cookie.trim().split("=");
    return name === cookieName ;
  });
  return result?.trim().split("=")[1];
}

type TCookie = {
  name:string;
  value:string
}

const setCookies = (cookie: TCookie) => {
    const {name,value} = cookie;
    document.cookie = `${name}=${value}; path=/; expires_in=3200; max-age=${new Date().getTime() + (60*60+1000)}; `;
  };

const resetCookies = () => {
  const cookies:Array<string> = document.cookie.split(";");
  for (const cookie of cookies) {
    let name = cookie.split("=")[0];
    document.cookie = `${name}= path=/ max-exp=${new Date().getTime()}; `;
  }
}

    
  return {initCookies,resetCookies,setCookies,cookiesExist,getCookieValue}
}