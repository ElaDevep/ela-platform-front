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
    data
}:Readonly<{
    labels:[string,string,string][]
    data:Report[]|undefined
}>){
    const chart = useRef(null)
    const [chartImage,setChartImage] = useState()
    const [certificatePDF,setCertificatePDF]=useState<undefined|string>()
    const certificateTemplateURL = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    const quicksandFontURL = '/public/fonts/quicksand.ttf'

    const createCertificate = async() =>{
        const certificateTemplateBlob = await fetch(certificateTemplateURL).
        then(res => 
            res.arrayBuffer()
        )
        const certificateTemplate = await PDFDocument.load(certificateTemplateBlob)
        certificateTemplate.registerFontkit(fontkit)

        const quicksandFontBlob = await fetch(quicksandFontURL).then(res => res.arrayBuffer())
        const quicksandFont = await certificateTemplate.embedFont(quicksandFontBlob )
        const page = certificateTemplate.getPages()[0]

        page.drawText(':v', {
            x: 40,
            y: 450,
            size: 45,
            font: quicksandFont,
            color: rgb(0, 0.53, 0.71),
        })
        
        const pdfBytes = await certificateTemplate.save()

        setCertificatePDF(pdfBytes.toString())
    }

    const download = (e:any)=>{
        if(chart.current){
            //@ts-ignore
            console.log(chart.current.canvas)
            //@ts-ignore
            const canvasChart = chart.current.canvas
            const chartContest = canvasChart.getContext('2d')
            setChartImage(canvasChart.toDataURL())
            createCertificate()
        }
    }

    useEffect(()=>{
        if(chart.current){
            //@ts-ignore
            //console.log(chart.current.canvas.toDataURL())
            //@ts-ignore
            const canvasChart = chart.current.canvas
            const chartContext = canvasChart.getContext('2d')
        }
    },[])

    return <>
        <a onClick={(e)=>download(e)} download={'chart'} href={certificatePDF}>Descarga</a>
        {(data && labels) && <>
            <Line
                data={{
                    labels: data.map((item)=>{
                        return item.mes
                    }),
                    datasets: labels.map((label,index)=>{
                        console.log(label)
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
        
    </>
}