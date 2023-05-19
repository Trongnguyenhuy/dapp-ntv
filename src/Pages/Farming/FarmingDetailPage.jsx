import FarmingInforCard from "../../Components/Card/FarmingInforCard";
import { Footer } from "../../Templates/HomeTepmplate/Footer"
import { Header } from "../../Templates/HomeTepmplate/Header"
import { useParams } from 'react-router-dom';

export default function Home() {
    const { id } = useParams(); // Nhận giá trị của param

    return (
        <>
            <Header />
            <FarmingInforCard />
            <Footer />
            {/* <h1>Giá trị của param: {id}</h1> */}
        </>
    )
}