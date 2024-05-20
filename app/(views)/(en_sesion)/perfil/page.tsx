'use client'

import { usePageContext } from '@/app/context/PageContext'
import styler from './page.module.sass'
import Form from '@/app/components/form/Form'
import { useForm } from '@/app/hooks/ela-hooks'

export default function Profile(){
    const {currentUser} = usePageContext()

    const form = useForm()


    return <>
        <main className={styler.main}>
            <h1 className={styler.pageTitle_h}>Perfil<hr/></h1>
            {currentUser && 
            <Form
                form={form}
                className={styler.profile_form}
            >
                <img src={currentUser.img}/>
                <h2>{currentUser.name}</h2>
                <h2>{currentUser.lastName}</h2>
                {currentUser.role != 'Cliente' &&
                    <h4>{currentUser.role}</h4>
                }
            </Form>
            }
        </main>
    </>
}