import enter_background from '@/public/jpg/enter_background.jpg'

import { Frame } from '@/ela-components'

import styler from './layout.module.sass'

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return <>
    
        <main className={styler.main}>
            <Frame
                src={enter_background}
                alt={'fondo'}
                className={styler.background_img}
                cover
            />
            <div className={styler.upLayer_div}/>
            {children}
        </main>
    </>
}
