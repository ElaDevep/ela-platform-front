'use client'

import Form from '@/app/components/form/Form'
import styler from './Profile.module.sass'
import { useForm } from '@/app/hooks/ela-hooks'
import { FormError, HiddenField, ImageUpload, PasswordField, Submit, TextField } from '@/app/components/form/ela-form'
import { useState } from 'react'
import putUser from '@/app/api/users/put_user'
import RestorePassword from '../../(ingreso)/recuperacion_contrasena/[token]/page'
import changePassword from '@/app/api/users/change_password'
import { title } from 'process'
import { usePageContext } from '@/app/context/PageContext'

export default function Profile({user}:Readonly<{user:CurrentUser}>){

    const updateForm = useForm(user)
    const changePassForm = useForm({_id:user.id})
    const [updating,setUpdating] = useState<boolean>(false)
    const [changePass,setChangePass] = useState<boolean>(false)
    const {reSetCurrentUser} = usePageContext()

    
    const newPasswordsMatch = (value:string)=>{
        const newPassword = changePassForm.inputs.newPassword.value
        if(value != newPassword){
            return {
                type:'differentPassword',
                message:'Las contraseñas no son iguales'
            }
        }
        return undefined
    }

    return <>
        {!updating ?
        <> 
            <div className={styler.profile_div}>
                <img src={user.imgProfile} className={styler.profile_img}/>
                <h2>{user.name}</h2>
                <h2>{user.lastName}</h2>
                {user.role != 'Cliente' &&
                    <h4>{user.role}</h4>
                }
                <h3>Empresa</h3>
                <p>{user.businessName}</p>
                <h3>Correo</h3>
                <p>{user.email}</p>
                <h3>Celular</h3>
                <p>{user.mobile}</p>
                {changePass &&
                <Form
                    className={styler.changePass_form}
                    form={changePassForm}
                >
                    <h3>Contraseña actual</h3>
                    <PasswordField
                        name={'currentPassword'}
                        form={changePassForm}
                        require
                    />
                    <h3>Nueva contraseña</h3>
                    <PasswordField
                        name={'newPassword'}
                        form={changePassForm}
                        require
                        pattern={{
                            value:/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*(?:\d\D*){4,}.*)(?=.*[!@#$%^&(){}*_\[\]]+)[a-zA-Z0-9!@#$%^&*_(){}\[\]]{12,}$/,
                            message:'La contraseña no cumple los requisitos solicitados'
                        }}
                    />
                    <h3>Confirmación de nueva contraseña</h3>
                    <PasswordField
                        name={'confirmPassword'}
                        form={changePassForm}
                        require
                        otherValidation={(value)=>(newPasswordsMatch(value))}
                    />
                    <FormError form={changePassForm} notification/>
                    <Submit
                        disable
                        form={changePassForm}
                        action={changePassword}
                        className={styler.changePass_submit}
                        success={{
                            title:'Todo correcto',
                            message: 'Tu contraseña a sido actualizada',
                            function:()=>setChangePass(false)
                        }}
                    >
                        Cambiar 
                    </Submit>
                    <button onClick={()=>setChangePass(false)}>
                        Cancelar
                    </button>
                </Form>
                }
                <button onClick={()=>setUpdating(true)}>Actualizar datos de contacto</button>
                {!changePass &&
                    <button onClick={()=>setChangePass(true)}>Cambiar contraseña</button>
                }
            </div>
        </>
        :
        <>
            <Form
                form={updateForm}
                className={styler.updateProfile_form}
            > 
                <img src={user.imgProfile} className={styler.profile_img}/>
                <h2>{user.name}</h2>
                <h2>{user.lastName}</h2>
                {user.role != 'Cliente' &&
                    <h4>{user.role}</h4>
                }
                <h3>Empresa</h3>
                <p>{user.businessName}</p>
                <h3>Correo</h3>
                <TextField
                    name={'email'}
                    form={updateForm}
                    
                />
                <h3>Celular</h3>
                <TextField
                    name={'mobile'}
                    form={updateForm}
                    
                />
                <HiddenField name='id' form={updateForm}/>
                <Submit
                    form={updateForm}
                    action={putUser}
                    className={styler.updateProfile_submit}
                    success={{
                        title:'Todo correcto',
                        message: 'La informacion ha sido actualizada',
                        function: ()=>{setUpdating(false);reSetCurrentUser()}
                    }}
                >
                    Guardar cambios
                </Submit>
                <button onClick={()=>setUpdating(false)} className={styler.cancelUpdate_button}>
                    Cancelar
                </button>

            </Form>
        </>
        }
    </>
}