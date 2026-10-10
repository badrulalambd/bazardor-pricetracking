
const formatPrice = (price: number) =>
  `${price.toLocaleString("bn-BD", {
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })} টাকা`;

interface IMarketProp {
  singleProductMarket: IMarketType[];
}

export default function MarketPriceTable({
  singleProductMarket,
}: IMarketProp) {
  // Sort markets by average price in ascending order.
  // Create a copy so the original API data is not mutated.
  const sortedMarkets = [...singleProductMarket].sort((a, b) => {
    const averageA = (a.min + a.max) / 2;
    const averageB = (b.min + b.max) / 2;

    return averageA - averageB;
  });

  return (
    <section className="w-full space-y-4">
      {/* Responsive table */}
      <div className="overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="table w-full min-w-[600px]">
            {/* Table heading */}
            <thead>
              <tr className="bg-base-200 text-base-content">
                <th className="px-5 py-4">বাজার</th>
                <th className="px-5 py-4">বিভাগ</th>
                <th className="px-5 py-4">সর্বনিম্ন</th>
                <th className="px-5 py-4">সর্বাধিক</th>
                <th className="px-5 py-4 text-right">গড়</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="divide-y divide-base-300">
              {sortedMarkets.map((item, indx) => (
                <tr
                  key={`${item.market}-${item.division}-${indx}`}
                  className="
                    odd:bg-base-100
                    even:bg-base-200
                    hover:bg-base-300/60
                    transition-colors
                  "
                >
                  <td className="px-5 py-4 font-semibold whitespace-nowrap">
                    {item.market}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap text-base-content/70">
                    {item.division}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm">
                      {formatPrice(item.min)}
                    </span>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm">
                      {formatPrice(item.max)}
                    </span>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap text-right font-bold text-[#05893E]">
                    {formatPrice((item.max + item.min) / 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}