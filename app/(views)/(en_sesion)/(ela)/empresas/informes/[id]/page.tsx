import styler from './page.module.sass'


export default function EnterpriseReports(params:{params:{id:string}}){
    return <>
        <h1 className={styler.pageTitle_h}>Gestión de informes<hr/></h1>
    </>
}