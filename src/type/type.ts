
interface ICategoryType{
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

interface IProductDetailType{
    id: string,
    slug: string,
    nameBn: string,
    category: string,
    categoryNameBn: string,
    categoryIcon: string,
    unit: string,
    image: string,
    today: number,
    yesterday: number,
    lastWeek: number,
    lastMonth: number,
    change: {
        dir: string;
        pct: number;
    }
    markets: [];
}