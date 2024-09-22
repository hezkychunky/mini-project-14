interface ICheckoutProps {
   coupon: boolean
}

export default function Checkout({coupon}: ICheckoutProps) {
   return(
   <div className="flex flex-col px-8 py-20 w-2/5 border border-yellow-500 border-l-2 border-b-0 border-t-0 border-r-0">
            <h1 className="text-center text-blue-600 text-3xl font-semibold mb-8">CART</h1>
            <table className="table-auto border-separate text-left border-spacing-x-4 border-spacing-y-1 text-gray-700">
               <thead>
                  <tr>
                     <th>Item</th>
                     <th>Qty</th>
                     <th>Price</th>
                     <th>Total</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>Konser Siksa Kubur</td>
                     <td>1</td>
                     <td>{(75000).toLocaleString('id-ID',{style:'currency', currency: 'IDR', maximumFractionDigits: 0})}</td>
                     <td>{(75000).toLocaleString('id-ID',{style:'currency', currency: 'IDR', maximumFractionDigits: 0})}</td>
                  </tr>
                  {coupon === true && <tr>
                     <td colSpan={3}>10% discount</td>
                     <td >-{(75000*0.1).toLocaleString('id-ID',{style: 'currency', currency:'IDR', maximumFractionDigits: 0})}</td>
                  </tr> }
                  <tr>
                           <td colSpan={3}>
                              <b>Total Price</b>
                           </td>
                           <td>
                              <b>
                                 {coupon === true? (75000*0.9).toLocaleString('id-ID',{style: 'currency', currency: 'IDR', maximumFractionDigits: 0})
                                 :
                                 (75000).toLocaleString('id-ID',{style: 'currency', currency: 'IDR', maximumFractionDigits: 0})
                                 }
                              </b>
                           </td>
                        </tr>
               </tbody>
            </table>
         </div>
   )
}
