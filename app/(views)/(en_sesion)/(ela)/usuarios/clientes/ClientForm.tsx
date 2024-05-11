'use client'

import styler from './ClientForm.module.sass'
import {Form, FormError, HiddenField, NumberField, Submit, TextField, useForm} from '@/ela-form'
import postClient from '@/app/api/users/post_client'
import putUser from '@/app/api/users/put_user'


export default function ClientForm({user}:Readonly<{user?:User}>){
    const form = useForm(user)

    return <>
        <Form
            className={styler.client_form}
            form={form}
        >
            <TextField
                label='Nombre'
                name='name'
                form={form}
                require
            />
            <TextField
                label='Apellidos'
                name='lastname'
                form={form}
                require
            />
            <TextField
                label='Correo'
                name='email'
                form={form}
                require
            />
            <NumberField
                label='Celular'
                name='mobile'
                form={form}
                require
                pattern={{
                    value:/^\d{10}$/,
                    message: 'El nuemero telefonico debe tener 10 digitos'
                }}
            />

            <TextField
                label='Empresa asociada'
                name = 'idEnterprice'
                form = {form}
                require
            />
            <FormError form={form}/>
            {user ?
            <>  
                <HiddenField name='_id' form={form}/>
                <Submit
                    action={putUser}
                    form={form}
                    success={{
                        title:'Usuario actualizado',
                        message: 'La información de '+(form.inputs.name && form.inputs.name.value)+' ha sido actualizada',
                        redirect:'/usuarios/clientes'
                    }}
                >
                    Actualizar
                </Submit>
            </>:
            <>
                <Submit
                    action={postClient}
                    form={form}
                    success={{
                        title:'Usuario creado',
                        message: (form.inputs.name && form.inputs.name.value)+ ' ya puede ingresar al plataforma'
                    }}
                >
                    Crear
                </Submit>
                
                <Submit
                    action={postClient}
                    form={form}
                    className={styler.createExit_submit}
                    success={{
                        title:'Usuario creado',
                        message: (form.inputs.name && form.inputs.name.value) + ' ya puede ingresar al plataforma',
                        redirect:'/usuarios/clientes'
                    }}
                >
                    Crear y salir
                </Submit>
            </>
            }
        </Form>
    </>
}