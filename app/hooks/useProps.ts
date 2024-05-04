'use client'

import { useEffect, useState } from "react";

export interface PropsConditioner{
    allTrue?:Array<boolean|undefined>
    someTrue?:Array<boolean|undefined>
    exist?:Array<any>|any
    noExist?:Array<any>|any
}

export type InitialProps =
    Array<{
        props?:{[key:string]:any},
        mix?:{[key:string]:any},
        mixClass?:Array<string|undefined>|string|undefined,
        conditions?:PropsConditioner
    }>|void|undefined


function useProps(initialProps:InitialProps){
    const [reRender,makeReRender] = useState<{}>()
    const [thisProps,setProps] = useState<{[key:string]:any}>({})
    const [initialClasses,setInitClasses] = useState<string>()
    

    //Needs that all conditions are true
    const allValidation = (items:Array<boolean|undefined>) =>{
        for(let item of items){
            if(!item){ 
                return false
            }
        }
        return true
    }

    //Enough with some right condition
    const someValidation = (items:Array<boolean|undefined>) =>{
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
                break
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
    const set = (props:{[key:string]:any},conditions:PropsConditioner|void,remove:boolean|void) =>{
        if(conditions){
            if(conditioner(conditions)){
                setProps(Object.assign({},thisProps,props))
            }
            else if(remove){
                for(let prop in props){
                    props[prop] = undefined
                }
                setProps(Object.assign({},thisProps,props))
                return false
            }
            else{
                return false
            }
        }
        else{
            setProps(Object.assign({},thisProps,props))
        }
        makeReRender({})
        return true
    }

    //Mix the classes   
    const mixClasses = (nameClasses:Array<string|undefined>|string|undefined,conditions:PropsConditioner|void,reset:boolean|void) =>{
        let returnClassName:string = ''
        
        if(thisProps.className){
            returnClassName = thisProps.className+' '
        }

        switch(typeof nameClasses){
            case 'object':
                for(let nameClass of nameClasses){
                    if(!returnClassName.match(new RegExp('^.*('+nameClass+')+.*$'))){
                        returnClassName += nameClass+' '
                    }
                }
                break
            case 'string':
                if(!returnClassName.match(new RegExp('^.*('+nameClasses+')+.*$'))){
                    returnClassName += nameClasses+' '
                }
                break
        }
        if(conditions){
            if(conditioner(conditions)){
                setProps(Object.assign(thisProps,{className:returnClassName}))
            }
            else{
                if(reset && initialClasses)
                    setProps(Object.assign(thisProps,{className:initialClasses}))
                return false
            }
        }
        else{
            setProps(Object.assign(thisProps,{className:returnClassName}))
        }
        makeReRender({})
        return true
    }

    const resetClasses = () =>{
        console.log(':v')
        console.log(initialClasses)
        if(initialClasses)
            setProps(Object.assign(thisProps,{className:initialClasses}))
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
                            initialPropsSet = Object.assign({},prop.props,initialPropsSet)
                        }
                        if(prop.mix){
                            for(let mixProp in prop.mix){
                                initialPropsSet[mixProp] = Object.assign({},prop.mix[mixProp],initialPropsSet[mixProp])
                            }
                        }
                        if(prop.mixClass){
                            switch(typeof prop.mixClass){
                                case 'object':
                                    for(let nameClass of prop.mixClass){
                                        if(thisProps.className){
                                            if(thisProps.className.match('/^.*('+nameClass+'.*)+$/')){
                                                continue
                                            }
                                        }
                                        initialPropsSet.className += ' '+nameClass
                                    }
                                    break
                                case 'string':
                                    if(thisProps.className){
                                        if(thisProps.className.match('/^.*('+prop.mixClass+'.*)+$/')){
                                            continue
                                        }
                                    }
                                    initialPropsSet.className += ' '+prop.mixClass
                                    break
                            }
                        }
                    }
                }
                else{
                    if(prop.props){
                        initialPropsSet = Object.assign({},prop.props,initialPropsSet)
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
            setProps(initialPropsSet)
            console.log('>:v')
            console.log(initialPropsSet.className)
            if(initialPropsSet.className)
                setInitClasses(initialPropsSet.className)
        }
        makeReRender({})
    },[])

    return {props:thisProps,getAll,get,set,mixClasses,resetClasses}
}

export default useProps 