
//imágenes
import ela_logo from '@/public/svg/logo_ela.svg'
import ela_logo_w from '@/public/svg/logo_ela_white.svg'


import BreakPoint from '@/app/components/BreakPoint'
import RestorePasswordRequestForm from './RestorePasswordRequestForm'
import styler from './page.module.sass'
import { Frame } from '@/app/components/ela-components'

export default function RestorePasswordRequest(){
    return <>
        <BreakPoint
            className={styler.vertical_relation}
            element={<div/>}
            relation={[3,5]}
            maxWidth={550}
        >
            <div className={styler.front_div}>
                <div className={styler.restoreRequest_div}>
                    <Frame
                        src={ela_logo}
                        darkSrc={ela_logo_w}
                        alt='ela_log'
                        className={styler.ElaLogoForm_img}
                    />
                    <RestorePasswordRequestForm/>
                </div>
            </div>
        </BreakPoint>
    </>
}