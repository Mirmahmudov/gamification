import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import "./SiteInfo.css"

function SiteInfo() {
    const navigate = useNavigate()
    return (
        <>
            <div className="site_info">
                <div className="pageName">
                    <IoIosArrowBack onClick={() => {
                        navigate(-1)
                    }} />
                    <h2> CODIAL RAG'BATLANTIRISH NIZOMI</h2>
                </div>


                <h3>Maqsad:</h3>

                <p>  Ushbu tizim o'quvchilarning bilim olishga, mustaqil o'rganishga va o'zini rivojlantirishga bo'lgan qiziqishini oshirish, ularni faol bo'lishga undash va mukofotlash uchun joriy etiladi. Har bir harakat o'zining aniq dalili asosida baholanadi va coin shaklida rag'batlantiriladi.</p>

                <h3>Coin olish shartlari va miqdori</h3>

                <div className="title">
                    <p>
                        1. Darsga keldi: <span>20 </span>coin
                    </p>
                    <p>
                        2. Kech qolmadi: <span>30  </span>coin
                    </p>
                    <p>
                        3. Berilgan uyga vazifani topshirdi: <span> 100 </span>coingacha
                    </p>
                    <p>
                        4. Har oyda bir marotaba imtihonda: <span>1000 </span>coingacha
                    </p>
                </div>
                <h3>
                    Rag'batlantirish
                </h3>
                <div className="title">
                    <p>
                        1. Kitob o'qish - <span>100</span> coin gacha. O'quvchi o'zbek tilida 15 bet, chet tilida 10 bet kitob o'qib, xulosasini yozishi va og'zaki gapirib berishi kerak. Kamroq bet o'qigan taqdirda, foiz asosida coin hisoblanadi.

                    </p>
                    <p>
                        2. Tozalik va tartibga rioya qilish - <span>20</span> coin. O'quvchi xona tozaligi yoki chiqindilarni chiqarishga hissa qo'shishi kerak.
                        Dalil: Xonada axlat yo'qligi yoki tartibli muhit.


                    </p>
                    <p>
                        3. Podkast tinglash va tahlil qilish - <span>50</span> coin gacha. <span>30</span> coin - podkast yoki videoni tinglab, yozma xulosa yozgan o'quvchi uchun. <span>50</span> coin - yozma xulosaga qo'shimcha ravishda og'zaki gapirib bersa.


                    </p>
                    <p>
                        4. Seminarlarda ishtirok etish - <span>100</span> coin. O'quvchi seminar yoki treningda faol ishtirok etgan bo'lsa, to'liq coin beriladi.
                    </p>
                    <p>
                        5. Qo'shimcha bilim olish (IT va loyihalar yaratish) - <span>100</span> coin gacha. IT yoki boshqa sohalarda yangi loyihalar yaratish, mustaqil o'rganish va darsdan tashqari bilim orttirish baholanadi.
                        Dalil: O'quvchining egallagan bilimini ustoz tahlil qiladi. O'rganilgan bilimning dolzarbligi va foydaliligiga qarab coin foiz hisobida beriladi.


                    </p>
                    <p>

                        6. Darsda faol ishtirok etish - <span>50</span> coin. O'quvchi dars jarayonida savol-javoblarga qatnashishi, topshiriqlarni bajarishi va dars davomida tashkil etilgan o'yinlarda faol ishtirok etishi kerak.
                        Dalil: Faollik ustoz tomonidan baholanadi.
                    </p>

                </div>

                <h3>
                    Muhim qoidalar
                </h3>
                <div className="title">

                    <p>

                        ➖ Coinlar har bir topshiriq yoki vazifa aniq dalil bilan tasdiqlanganidan keyin beriladi.
                    </p>
                    <p>
                        ➖ Har bir topshiriq ustoz tomonidan tekshiriladi va belgilangan foiz asosida baholanadi.
                    </p>
                    <p>
                        ➖ Coinlar o'quvchining shaxsiy hisobida jamlanadi va keyinchalik rag'batlantirish uchun ishlatiladi.
                    </p>
                </div>


                <a href="">
                    Codial jamoasi - har bir o'quvchining rivoji va yutuqlariga e'tibor qaratadi!
                </a>
            </div>
        </>
    )
}

export default SiteInfo