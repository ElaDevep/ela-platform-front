'use client'

import styler from './page.module.sass'
import { TextField,Form,useForm } from '@/ela-form'

export default function NewClient(){
    const form = useForm()

    return <>
        <h1 className={styler.pageTitle_h}>Gestión de clientes<hr/></h1>
        {/* <Form

            form={form}
        >
            
            <TextField
            
            />
        </Form> */}
    </>
}