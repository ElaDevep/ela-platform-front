'use client'

import styler from './ReportGraphic.module.sass'
import { Line } from 'react-chartjs-2'

import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function ReportGraphic({
    labels,
    data,
    template,
    scale,
    y
}:Readonly<{
    labels:[string,string,string][]
    data:Report[]|undefined
    template:string
    scale:number
    y: number
}>){
    const chart = useRef(null)
    const [chartImage,setChartImage] = useState()
    const [certificatePDF,setCertificatePDF]=useState<undefined|Uint8Array>()
    const certificateTemplateURL = template

    

    const downloadHandle = async (e:any)=>{
       //console.log(':v')
        if(chart.current){
            //@ts-ignore
            const canvasChart = chart.current.canvas
            const chartContext = canvasChart.getContext('2d')
            const chartImage = canvasChart.toDataURL("image/png")
            setChartImage(chartImage)

            const certificateTemplateBytes = await fetch(certificateTemplateURL).
            then(res => 
                res.arrayBuffer()
            )

            const certificateTemplate = await PDFDocument.load(certificateTemplateBytes)

            const page = certificateTemplate.getPages()[0]

            const chartImagePng = await certificateTemplate.embedPng(chartImage)

            const chartDims = chartImagePng.scale(scale)

            page.drawImage(chartImagePng, {
                x: page.getWidth() / 2 - chartDims.width / 2,
                y: page.getHeight() / 2 - y,
                width: chartDims.width,
                height: chartDims.height,
            })
                
            const pdfBytes = await certificateTemplate.save()

            // // setCertificatePDF('data:application/pdf;charset=utf-8,'+new TextDecoder().decode(pdfBytes))
            // //console.log(pdfBytes)
            require("downloadjs")(pdfBytes,"certificado.pdf"," application/pdf");
        }
    }

    useEffect(()=>{
       //console.log(template)
        //if(!certificatePDF)
        //createCertificate()
    })

    return <>
        <a onClick={(e)=>downloadHandle(e)}>Descarga</a>
        <div className={styler.graphic_canvas}>
        {(data && labels) && <>
            <Line
                data={{
                    labels: data.map((item)=>{
                        return item.mes
                    }).reverse(),
                    datasets: labels.map((label,index)=>{
                       //console.log(label)
                        return {
                            label: label[1],
                            data: data.map((item)=>{
                                return item[label[0]]
                            }),
                            fill: false,
                            borderColor: label[2],
                            tension: 0.1
                        }
                    })
                }}
                options={{
                    scales: {
                        y: {
                            min: 0
                        }
                    }
                }}
                
                ref={chart}
            ></Line>
        </>
        }
        </div>
        
    </>
}