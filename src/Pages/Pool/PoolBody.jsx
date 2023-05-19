import PoolCard from "../../Components/Card/PoolCard";

export const PoolBody = () => {
    const poolCard = [
        { id: 1, isHome: true },
        { id: 2, isHome: true },
        { id: 3, isHome: true }
    ]
    return (
        <div className="flex flex-col justify-center py-10">
            <div className="flex flex-col justify-around items-center py-8">
                <h1 className="font-poppins font-bold text-4xl uppercase ">POOLS</h1>
                <h2 className="font-sans font-medium text-3xl py-2">Gửi tiết kiệm đầu tư không rủi ro</h2>
            </div>

            <div className={`flex flex-col justify-between h-sceen px-16 gap-6`}>

                {poolCard.map(item => (
                    <PoolCard
                        key={item.id}
                        id={item.id}
                        isHome={item.isHome}
                    />
                ))}
            </div>
        </div>
    );
};
