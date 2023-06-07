import PoolCard from "../../Components/Card/PoolCard";

export const PoolBody = () => {
    const poolCard = [
        { id: 1, totalLiquidity: 100000000},
        { id: 2, totalLiquidity: 9000000 },
        { id: 3, totalLiquidity: 20000000 }
    ]
    return (
        <div className="container mx-auto h-screen flex flex-col justify-center py-10">
            <div className="flex flex-col justify-around items-center py-16">
                <h1 className="font-poppins font-bold text-4xl uppercase ">POOLS</h1>
                <h2 className="font-sans font-medium text-3xl py-2">Cung cấp thanh khoản cho thị trường và nhận phí hoán đổi từ mỗi giao dịch</h2>
            </div>

            <div className={`grid grid-cols-3 h-sceen px-16 gap-8`}>

                {poolCard.map(item => (
                    <PoolCard
                        key={item.id}
                        id={item.id}
                        totalLiquidity={item.totalLiquidity}
                    />
                ))}
            </div>
        </div>
    );
};
