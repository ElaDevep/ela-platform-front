'use client'

import { FileInput, Form, FormError, HiddenField, useForm } from '@/app/components/form/ela-form'
import styler from './ReportReader.module.sass'
import { useManager } from '@/app/components/table/useManager'
import { useEffect } from 'react'
import postWaterReport from '@/app/api/reports/agua/post_waterReport'

export default function ReportReader({
    id,
    manager,
    action
}:Readonly<{
    id:string
    manager:useManager<Report>,
    action: (prevState: any, formData: FormData)=>Promise<string>
}>){
    const reportForm = useForm({id:id})

    useEffect(()=>{
        if(reportForm.response.status == 'ok'){
            manager.getAllData()
        }
    },[reportForm.response])

    return <>
        <Form form={reportForm} className={styler.reportReader_div}>
            <FileInput
                name='file'
                form={reportForm}
                action={action}
            />
            <HiddenField name='id' form={reportForm}/>
            <FormError form={reportForm} notification/>
        </Form>
    </>
}