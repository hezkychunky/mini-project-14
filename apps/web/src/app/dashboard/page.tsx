'use client'

import { useUserLogin } from "@/context/UserContext";
import { useRouter } from "next/navigation";
// import React, { Component, useState } from "react";
import { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


export default function Dashboard() {

  const router = useRouter()

  const { defaultLoginUser } = useContext(useUserLogin)

  if (defaultLoginUser.id !== 1) {router.push('/')}

 useEffect(() => {

    fetch(`http://localhost:8000/api/payments`)
    .then(response => response.json())
    .then(data => {
      const paymentList = data.payments

      // mencari tanggal-tanggal terjadinya pembelian tiket concerts
      const concert1 = paymentList.filter((item:any) => item.IdKonser === 1)
      const concertPayment = concert1.map((item:any) => {
        const convertToDate = new Date(item.createdAt)
        const toGmt = convertToDate.getMonth()+1 +'/'+ convertToDate.getDate() + '/' + convertToDate.getFullYear().toString() + ' ' + 'GMT'
        return toGmt
      }) 
      
      console.log([...new Set(concertPayment)]);
        

      // mencari jumlah tiket per tanggal transaksi concert 1
      
      const transactionDates = concert1.map((item:any) => item.createdAt.substring(0,10)) //masih ada duplicate
      const sortedTransactionDates = transactionDates.sort((a:any,b:any) => Date.parse(a) - Date.parse(b))
      const setSortedTransactionDates = [...new Set(sortedTransactionDates)]
      const totalDailyTransaction = []
      let count = 0
      for (let i = 0; i < setSortedTransactionDates.length; i++) { 
        for (let j = 0; j < sortedTransactionDates.length; j++) {
          if(setSortedTransactionDates[i] === sortedTransactionDates[j]) {
            count++
          } 
        }
        totalDailyTransaction.push(count)
        count = 0
      } 
      console.log(setSortedTransactionDates);
      
      
      setState({
        series: [{
          name: 'Tabraklari Fest',
          data: totalDailyTransaction
        },
        // {
        //   name: 'Konser Petualangan Sherina',
        //   data: totalDailyTransaction2
        // },
        // {
        //   name: 'Dream Theater',
        //   data: totalDailyTransaction3
        // },
        // {
        //   name: 'Java Jazz',
        //   data: totalDailyTransaction4
        // },
        // {
        //   name: 'Java Rockinland',
        //   data: totalDailyTransaction
        // }
        ],
        
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
          type: 'datetime',
          categories: [...new Set(concertPayment)], //convert ke distinct (Set)
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
 },[])

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
            <div id="chart" className="flex flex-col justify-center items-center my-10">
            <h1 className="text-slate-600 text-3xl">Sold Tickets Report</h1>
               <ReactApexChart options={state.options} series={state.series} type="bar" height={350} width={600} />
            </div>
         <div id="html-dist"></div>
         </div>
       );
}