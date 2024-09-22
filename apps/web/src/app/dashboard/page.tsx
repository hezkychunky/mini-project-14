'use client'

import { useUserLogin } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DashboardMonthly from "./dashboard-month";
import DashboardAnnual from "./dashboard-year";


export default function Dashboard() {

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
      
      // mencari tanggal-tanggal terjadinya pembelian tiket concerts
      const concertPayment = paymentList.map((item:any) => {
        const convertToDate = new Date(item.createdAt)
        const toGmt = convertToDate.getMonth()+1 +'/'+ convertToDate.getDate() + '/' + convertToDate.getFullYear().toString() + ' ' + 'GMT'
        return toGmt
      }) 
      
      console.log();
        

      // mencari jumlah tiket per tanggal transaksi
      
      const transactionDates = paymentList.map((item:any) => item.createdAt.substring(0,10)) //masih ada duplicate
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
      // console.log(paymentList,'paymentlist');

      // mendapatkan distinct concertID
      const getAllConcertId = paymentList.map((payment:any) =>  payment.IdKonser)
      const distinctConcertId = [...new Set(getAllConcertId)]
      // console.log(distinctConcertId);
      
      setState({
        series: [{
          name: 'Total of Sold Events',
          data: totalDailyTransaction
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
            <h1 className="text-slate-600 text-3xl">Sold Tickets Report</h1>
            <label className="font-sans font-semibold text-slate-600" htmlFor="list">List of events</label>
            <div className="flex justify-evenly flex-wrap gap-2 mt-2">
              <button className="hover:scale-105 hover:brightness-9 px-2 py-1 text-sm font-sans rounded-lg bg-yellow-400 text-white font-semibold" onClick={() => setSelectedEvent('payments')} >All Events</button>
              {concertNameList.map((item:any) => {
                return (
                  <button key={item.id} value={item.id} onClick={() => setSelectedEvent(`payments/concert/${item.id}`)} className="hover:scale-105 hover:brightness-9 cursor-pointer px-2 py-1 text-sm font-semibold font-sans rounded-lg bg-yellow-400 text-white">{item.namaKonser}</button>
                )
              })}
            </div>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} width={600} />
            <DashboardMonthly />
            <DashboardAnnual />
            </div>
         <div id="html-dist"></div>
         </div>
       );
}