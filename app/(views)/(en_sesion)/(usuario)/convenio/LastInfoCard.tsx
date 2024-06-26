'use client'

import styler from './LastInfoCard.module.sass'

export default function LastInfoCard({
    title,
    data,
    unit,
}:Readonly<{
    title:string,
    data:string
    unit?:string
}>){
    return <>
    <section className={styler.lastInfoCard_section}>
        <h4>{title}</h4>
        <div className={styler.data_div}>
            <span>{data}</span><span className={styler.unit_span}>{unit}</span>
        </div>
    </section>
    </>
}