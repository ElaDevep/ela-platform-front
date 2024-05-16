'use client'

import { Frame } from '@/app/components/ela-components'
import styler from './UserCard.module.sass'

import profile_d from '@/public/svg/profile_d.svg'
import profile_w from '@/public/svg/profile_w.svg'
import { Children, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { PasswordField } from '@/app/components/form/ela-form'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logIn } from '@/app/api/auth/log_in'
import deleteUser from '@/app/api/users/delete_user'
import { useManager } from '@/app/components/table/useManager'

export default function UserCard({
    manager
}:Readonly<{
    manager:useManager<User>
}>){
    const pathname = usePathname()
    const [user,setUser] = useState<User>()

    const onDeleteUser = async() =>{
        if(user){
            const res = await deleteUser(user._id)
            console.log(res)
            console.log('🦅')
            setUser(undefined)
        }
    }

    
    useEffect(()=>{
        console.log(manager.current)
        setUser(manager.current)
    },[manager.current])

    return <>
        {user ?
            <>
            <div className={styler.userCard_div}>
                <img src={user?.imgProfile} className={styler.profile_img}/>
                <h4>Nombres</h4>
                <span>{user.name}</span>
                <h4>Apellidos</h4>
                <span>{user.lastname}</span>
                <h4>Correo</h4>
                <span>{user.email}</span>
                <h4>Celular</h4>
                <span>{user.mobile}</span>
                <h4>Empresa</h4>
                <span>{user.idEnterprice}</span>
                <h4>Role</h4>
                <span>{user.role}</span>
                <div className={styler.userActions_div}>
                    <Link href={pathname+'/editar/'+user._id} className={styler.editUser_link}>Modificar</Link>
                    <button className={styler.deleteUser_button} onClick={manager.deleteCurrent}>Eliminar</button>
                </div>
            </div>

            </>
            :<>
            <div className={styler.noUserCard_div}>
                <Frame
                    src={profile_w}
                    darkSrc={profile_d}
                    alt={'profile'}
                    className ={styler.profile_img}
                />
                <span className={styler.unSelect_span}>Seleccione un usuario para ver mas detalles</span>
            
                </div>
            </>
        }
    </>
}