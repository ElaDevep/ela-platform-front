'use client'

import { usePageContext } from '@/app/context/PageContext'
import { Frame } from '../ela-components'
import styler from './Header.module.sass'
import ela_logo from '@/public/svg/logo_ela.svg'
import ela_logo_w from '@/public/svg/logo_ela_white.svg'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Header({}:Readonly<{}>){
    const {currentUser,userAccess,CloseSession} = usePageContext()
    const pathname = usePathname()
    const router = useRouter()


    return <>
        <header className={styler.header}>
            <div className={styler.title_div}>
                <h1>ELA APP</h1>
                <Frame
                    src={ela_logo_w}
                    alt='ela_logo'
                    className={styler.ElaIcon_img}
                />
            </div>
            {currentUser && 
                <>
                    <div className={styler.currentUser_div} onClick={()=>router.push('/perfil')}>
                        <img 
                            src={currentUser.imgProfile} 
                            className={styler.currentUser_img}
                        />
                        <div className={styler.userInfo_div}>
                            <span className={styler.userName_span}>{currentUser.shortName}</span>
                            <button className={styler.logOut_button} onClick={CloseSession} >Cerrar sesión<hr/></button>
                        </div>
                    </div>
                </>
            }
            {userAccess &&
                <>
                    <nav className={styler.mainMenu_nav}>
                        {
                            userAccess.map((access:View,index:number)=>{
                                if(access.navAble){
                                    if(pathname.match('^'+access.route+'.*$')){
                                        return <Link 
                                            key={index} 
                                            className={styler.currentRoute} 
                                            href={access.route}
                                        >
                                            {access.title}
                                        </Link>

                                    }
                                    else{
                                        return <Link 
                                            key={index} 
                                            href={access.route}
                                        >
                                            {access.title}
                                        </Link>
                                    }
                                }
                                
                            })
                        }
                    </nav>
                </>
            }
        </header>
    </>
}