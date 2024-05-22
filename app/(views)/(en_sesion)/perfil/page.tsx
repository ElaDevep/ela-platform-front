'use client'

import { usePageContext } from '@/app/context/PageContext'
import styler from './page.module.sass'
import Form from '@/app/components/form/Form'
import { useForm } from '@/app/hooks/ela-hooks'
import { TextField } from '@/app/components/form/ela-form'
import Profile from './Profile'

export default function ProfilePage(){
    const {currentUser} = usePageContext()



    return <>
        <main className={styler.main}>
            <h1 className={styler.pageTitle_h}>Perfil<hr/></h1>
            {currentUser &&
                <Profile user={currentUser}/>
            }
        </main>
    </>
}