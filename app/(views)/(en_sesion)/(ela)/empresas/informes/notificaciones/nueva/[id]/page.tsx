import NotificationForm from './NotificationForm'
import styler from './page.module.sass'

export default function NewNotification({params}:{params:{id:string}}){

    return <>
        <div>
            <h2>Nueva notificación</h2>
            <NotificationForm idEnterprise={params.id}/>
        </div>
    </>
}