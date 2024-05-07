'use client'
//imágenes
import ela_logo from '@/public/svg/logo_ela.svg'
import ela_logo_w from '@/public/svg/logo_ela_white.svg'


import BreakPoint from '@/app/components/BreakPoint'
import styler from './page.module.sass'
import { Frame } from '@/app/components/ela-components'
import RestorePasswordForm from './RestorePasswordForm'
import { useEffect } from 'react'

export default function RestorePassword({params}:{params:{token:string}}){

    return <>
        <BreakPoint
            className={styler.vertical_relation}
            element={<div/>}
            relation={[3,5]}
            maxWidth={550}
        >
            <div className={styler.front_div}>
                <div className={styler.restorePassword_div}>
                    <Frame
                        src={ela_logo}
                        darkSrc={ela_logo_w}
                        alt='ela_log'
                        className={styler.ElaLogoForm_img}
                    />
                    <RestorePasswordForm token={params.token}/>
                </div>
            </div>
        </BreakPoint>
    </>
}