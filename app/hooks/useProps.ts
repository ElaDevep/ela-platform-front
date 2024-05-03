'use client'

import { useEffect, useState } from "react";

export interface PropsConditioner{
    allTrue?:Array<boolean>
    someTrue?:Array<boolean>
    exist?:Array<any>|any
    noExist?:Array<any>|any
}

function useProps(initialProps:Array<{
        props?:{[key:string]:any},
        mix?:{[key:string]:any},
        mixClass?:Array<string>|string,
        conditions?:PropsConditioner
    }>|void){
    const [thisProps,setProps] = useState<{[key:string]:any}>({})

    

    //Needs that all conditions are true
    const allValidation = (items:Array<boolean>) =>{
        for(let item of items){
            if(!item){ 
                return false
            }
        }
        return true
    }

    //Enough with some right condition
    const someValidation = (items:Array<boolean>) =>{
        for(let item of items){
            if(item){ 
                return true
            }
        }
        return false
    }

    //Require defined props
    const existValidation = (items:Array<any>|any) =>{
        switch(typeof items){
            case 'object':
                for(let item of items){
                    if(item==undefined || item==''  || items==false){ 
                        return false
                    }
                }
                break
            default:
                if(items==undefined || items=='' || items==false){ 
                    return false
                }
        }
        return true
    }

    //Require undefined props, to prevent contradictions
    const noExistValidation = (items:Array<any>|any) =>{
        switch(typeof items){
            case 'object':
                for(let item of items){
                    if(item!=undefined && item!=''){ 
                        return false
                    }
                }
                break
            case 'string':
                if(items!=undefined && items!='' ){ 
                    return false
                }
        }
        return true
    }

    //Validate conditions to apply the props
    const conditioner = (conditions:PropsConditioner) =>{
        let result:boolean = true
        for(let condition in conditions){
            switch(condition){
                case 'allTrue': 
                    if(conditions.allTrue)
                        result = allValidation(conditions.allTrue)
                    break
                case 'someTrue':
                    if(conditions.someTrue)
                        result = someValidation(conditions.someTrue)
                    break
                case 'exist':
                    if(conditions.exist)
                        result = existValidation(conditions.exist)
                    break
                case 'noExist':
                    if(conditions.noExist)
                        result = noExistValidation(conditions.noExist)
                    break
                default:
                    return false
            }
            //If result is false in any case break the function
            if(!result) return false
        }

        return result
    }

    //Add or overwrite a prop
    const set = (props:{[key:string]:any},conditions:PropsConditioner|void) =>{
        if(conditions){
            if(conditioner(conditions)){
                setProps(Object.assign(props,thisProps))
            }
        }
        else{
            setProps(Object.assign(props,thisProps))
        }
    }

    //Mix the classes   
    const mixClasses = (nameClasses:Array<string>|string,conditions:PropsConditioner|undefined) =>{
        let returnClassName:string = ''
        
        if(thisProps.className){
            returnClassName = thisProps.className
        }

        switch(typeof nameClasses){
            case 'object':
                returnClassName += ' '+nameClasses.join(' ')
                break
            case 'string':
                returnClassName += ' '+nameClasses
                break
        }

        if(conditions){
            if(conditioner(conditions)){
                setProps(Object.assign({className:returnClassName},thisProps))
            }
        }
    }

    const get = (prop:string) =>{
        return thisProps.prop
    }

    const getAll = () =>{
        return thisProps
    }

    useEffect(()=>{
        let initialPropsSet:{[key:string]:any} = {}

        if(initialProps){
            for(let prop of initialProps){
                if(prop.conditions){
                    if(conditioner(prop.conditions)){
                        if(prop.props){
                            initialPropsSet = Object.assign(prop.props,initialPropsSet)
                        }
                        if(prop.mix){
                            for(let mixProp in prop.mix){
                                initialPropsSet[mixProp] = Object.assign(prop.mix[mixProp],initialPropsSet[mixProp])
                            }
                        }
                        if(prop.mixClass){
                            switch(typeof prop.mixClass){
                                case 'object':
                                    initialPropsSet.className += ' '+prop.mixClass.join(' ')
                                    break
                                case 'string':
                                    initialPropsSet.className += ' '+prop.mixClass
                                    break
                            }
                        }
                    }
                }
                else{
                    if(prop.props){
                        initialPropsSet = Object.assign(prop.props,initialPropsSet)
                    }
                    // if(prop.mix){
                    //     for(let mixProp in prop.mix){
                    //         Object.assign(initialPropsSet[mixProp],prop.mix[mixProp])
                    //     }
                    // }
                }
            }
        }
        setProps(initialPropsSet)
    },[])

    return {props:thisProps,getAll,get,set,mixClasses}
}

export default useProps 