'use client'

import styler from './EnterpriseForm.module.sass'
import {Form, FormError, HiddenField, NumberField, SelectionField, Submit, TextField, useForm} from '@/ela-form'
import postClient from '@/app/api/users/post_client'
import putUser from '@/app/api/users/put_user'
import getEnterprises from '@/app/api/enterprises/get_enterprises'
import postElaUser from '@/app/api/users/post_elaUser'
import getRoles from '@/app/api/users/get_roles'
import postEnterprise from '@/app/api/enterprises/post_enterprise'
import putEnterprise from '@/app/api/enterprises/put_enterprise'


export default function EnterpriseForm({enterprise}:Readonly<{enterprise?:Enterprise}>){
    const form = useForm(enterprise)

    return <>
        <Form
            className={styler.client_form}
            form={form}
        >
            <TextField
                label='Razón social'
                name='razonSocial'
                form={form}
                require
            />
            <NumberField
                label='NIT'
                name='nNit'
                form={form}
                require
            />
            <TextField
                label='Dirección'
                name='direccion'
                form={form}
                require
            />
            <NumberField
                label='Celular'
                name='celular'
                form={form}
                require
                pattern={{
                    value:/^\d{10}$/,
                    message: 'El nuemero telefonico debe tener 10 digitos'
                }}
            />

            <SelectionField
                label='Tipo'
                name = 'tipo'
                form = {form}
                require
                options={[
                    ['Comercio','Comercio'],
                    ['Alimentos','Alimentos'],
                    ['Condominio','Condominio'],
                    ['Enseñanza','Enseñanza'],
                    ['Hospitalidad','Hospitalidad'],
                    ['Industria','Industria'],
                    ['Salud','Salud'],
                    ['otro','otro'],
                ]}
            />
            <TextField
                label='Sede'
                name = 'sede'
                form = {form}
                require
            />
            <FormError form={form}/>
            {enterprise ?
            <>  
                <HiddenField name='_id' form={form}/>
                <Submit
                    action={putEnterprise}
                    form={form}
                    success={{
                        title:'Empresa actualizado',
                        message: 'La información de '+(form.inputs.razonSocial && form.inputs.razonSocial.value)+' ha sido actualizada',
                        redirect:'/empresas'
                    }}
                >
                    Actualizar
                </Submit>
            </>:
            <>
                <Submit
                    action={postEnterprise}
                    form={form}
                    success={{
                        title:'Empresa creada',
                        message: (form.inputs.razonSocial && form.inputs.razonSocial.value)+ ' ya esta asociada con ELA'
                    }}
                >
                    Crear
                </Submit>
                
                <Submit
                    action={postEnterprise}
                    form={form}
                    className={styler.createExit_submit}
                    success={{
                        title:'Empresa creada',
                        message: (form.inputs.name && form.inputs.name.value) + ' ya esta asociada con ELA',
                        redirect:'/empresas'
                    }}
                >
                    Crear y salir
                </Submit>
            </>
            }
        </Form>
    </>
}