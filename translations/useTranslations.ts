import React, { useLayoutEffect, useState } from "react";
import { useAppSelector } from '../../hooks/index';
import Login from "./login/index.json";

export const useTranslations = (sectionOrComponent?:string) => {

    const {lang,translations} = useAppSelector((state)=>state.languageReducer);
    const [translation,setCurrentTranslation] = useState<string>(JSON.parse(translations)[sectionOrComponent])

    const translate = (elementPath: string): string => {
        try{
            const paths:Array<any> = elementPath.split(".");
            let target: any = translation;
            paths.forEach((path,i)=>{
                target = target[path];
            });
            return target[lang];
        }catch(e){
            throw new Error(e)
        }
    }

    return {translate};
}