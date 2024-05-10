'use client'

import { Frame } from '@/app/components/ela-components'
import styler from './UserCard.module.sass'

import profile_d from '@/public/svg/profile_d.svg'
import profile_w from '@/public/svg/profile_w.svg'
import { Children } from 'react'
import { PasswordField } from '@/app/components/form/ela-form'
import Link from 'next/link'

export default function UserCard({
    user
}:Readonly<{
    user:User|undefined
}>){
    console.log(user)

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
                <h4>Role</h4>
                <span>{user.role}</span>
                <div className={styler.userActions_div}>
                    <Link href='/' className={styler.editUser_link}>Modificar</Link>
                    <button className={styler.deleteUser_button}>Eliminar</button>
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