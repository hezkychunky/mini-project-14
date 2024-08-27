import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className="w-[1440px] h-[954px] relative bg-white">
      <div className="w-[531px] left-[64px] top-[64px] absolute text-[#252525] text-[88px] font-extrabold font-['Avenir'] leading-[104px]">Projects and practice</div>
      <div className="left-[64px] top-[341px] absolute justify-start items-start gap-14 inline-flex">
        <div className="justify-start items-start gap-[70px] flex">
          <div className="flex-col justify-center items-start gap-6 inline-flex">
            <div className="h-[180px] flex-col justify-start items-start gap-1 flex">
              <div className="text-[#252525]/60 text-[32px] font-extrabold font-Avenir">01</div>
              <div className="w-[400px] text-[#252525]/80 text-2xl font-normal font-Avenir">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus semper habitant arcu eget. Et integer facilisi eget.</div>
            </div>
            <img className="w-[400px] h-[345px] relative" src="https://via.placeholder.com/400x345" />
          </div>
        </div>
        <div className="justify-start items-start gap-[70px] flex">
          <div className="flex-col justify-center items-start gap-6 inline-flex">
            <div className="h-[180px] pr-[37px] flex-col justify-start items-start gap-1 flex">
              <div className="text-[#252525]/60 text-[32px] font-extrabold font-['Avenir']">02</div>
              <div className="w-[400px] text-[#252525]/80 text-2xl font-normal font-['Avenir']">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus semper habitant arcu eget. Et integer facilisi eget.</div>
            </div>
            <img className="w-[400px] h-[345px] relative" src="https://via.placeholder.com/400x345" />
          </div>
        </div>
        <div className="justify-start items-start gap-[70px] flex">
          <div className="flex-col justify-center items-start gap-6 inline-flex">
            <div className="h-[180px] flex-col justify-start items-start gap-1 flex">
              <div className="text-[#252525]/60 text-[32px] font-extrabold font-['Avenir']">03</div>
              <div className="w-[400px] text-[#252525]/80 text-2xl font-normal font-['Avenir']">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus semper habitant arcu eget. Et integer facilisi eget.</div>
            </div>
            <img className="w-[400px] h-[345px] relative" src="https://via.placeholder.com/400x345" />
          </div>
        </div>
      </div>
    </div>
  )
}
