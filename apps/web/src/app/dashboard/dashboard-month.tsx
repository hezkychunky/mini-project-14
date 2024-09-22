'use client'

import { useUserLogin } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


export default function DashboardMonthly() {

  const router = useRouter()

  const { defaultLoginUser } = useContext(useUserLogin)

  if (defaultLoginUser.id !== 1) {router.push('/')}

  const [concertNameList, setConcertNameList] = useState([])
  const [selectedEvent, setSelectedEvent] = useState('payments')

 useEffect(() => {
  fetch(`http://localhost:8000/api/concerts`)
  .then(response => response.json())
  .then(data => {
    const concertList = data.concerts
    setConcertNameList(concertList)
    console.log(selectedEvent);
    
  })
 },[]) 

 useEffect(() => {

    fetch(`http://localhost:8000/api/${selectedEvent}`)
    .then(response => response.json())
    .then(data => {
      const paymentList = data.payments
      // console.log(paymentList);
      
      // mencari jumlah tiket per bulan transaksi
      
      const transactionDates = paymentList.map((item:any) => item.createdAt.substring(0,10)) //masih ada duplicate
      const sortedTransactionDates = transactionDates.sort((a:any,b:any) => Date.parse(a) - Date.parse(b))
      const sortedTransactionMonth = sortedTransactionDates.map((item:any) => item.substring(0,7))
      const setSortedTransactionMonth = [...new Set(sortedTransactionMonth)]
      const totalMonthlyTransaction = []
      let count = 0
      for (let i = 0; i < setSortedTransactionMonth.length; i++) { 
        for (let j = 0; j < sortedTransactionDates.length; j++) {
          if(setSortedTransactionMonth[i] === sortedTransactionMonth[j]) {
            count++
          } 
        }
        totalMonthlyTransaction.push(count)
        count = 0
      } 
      console.log(sortedTransactionMonth,'monthly payment');

      // mendapatkan distinct concertID
      const getAllConcertId = paymentList.map((payment:any) =>  payment.IdKonser)
      const distinctConcertId = [...new Set(getAllConcertId)]
      // console.log(distinctConcertId);
      
      setState({
        series: [{
          name: 'Total of Sold Events',
          data: totalMonthlyTransaction
        }],
        
        options: {
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
              borderRadiusApplication: 'end', // 'around', 'end'
              borderRadiusWhenStacked: 'last', // 'all', 'last'
              dataLabels: {
                total: {
                  enabled: false,
                  style: {
                    fontSize: '12px',
                    fontWeight: 900
                  }
                }
              }
          },
        },
        xaxis: {
          type: 'category',
          categories: setSortedTransactionMonth
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      }})
      // console.log(concertNames);
    })
 },[selectedEvent])

   interface Props {
      series: any,
      options: any,

   }

   const [state, setState] = useState<Props>({
         series: [],
         options: {},
       })

       return (
         <div>
            <div id="chart" className="flex flex-col justify-center items-center my-8">
            <h1 className="text-slate-600 text-3xl">Monthly</h1>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} width={600} />
            </div>
         <div id="html-dist"></div>
         </div>
       );
}