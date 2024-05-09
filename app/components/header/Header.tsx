'use client'

import { usePageContext } from '@/app/context/PageContext'
import { Frame } from '../ela-components'
import styler from './Header.module.sass'
import ela_logo from '@/public/svg/logo_ela.svg'
import ela_logo_w from '@/public/svg/logo_ela_white.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header({}:Readonly<{}>){
    const {currentUser,userAccess} = usePageContext()
    const pathname = usePathname()


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
                    <div className={styler.currentUser_div}>
                        <img 
                            src={currentUser.img} 
                            className={styler.currentUser_img}
                        />
                        <div className={styler.userInfo_div}>
                            <span className={styler.userName_span}>{currentUser.name[0]+' '+currentUser.lastName[0]}</span>
                            <button className={styler.logOut_button}>Cerrar sesión<hr/></button>
                        </div>
                    </div>
                </>
            }
            {userAccess &&
                <>
                    <nav className={styler.mainMenu_nav}>
                        {
                            userAccess.map((access:View,index:number)=>{
                                if(pathname.match('^'+access.route+'$')){
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
                            })
                        }
                    </nav>
                </>
            }
        </header>
    </>
}