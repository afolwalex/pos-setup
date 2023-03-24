interface BillsType {
    id: number;
    type: string;
    list: ListType[];
}

interface ListType {
    id: number;
    name: string;
}

const bills: BillsType[] = [
    {
        id: 1,
        type: 'Airtime',
        list: [
            {id: 1, name: 'Airtel'},
            {id: 2, name: '9mobile'},
            {id: 3, name: 'MTN'},
            {id: 4, name: 'Glo'},
        ],
    },
    {
        id: 2,
        type: 'Cable TV',
        list: [
            {id: 1, name: 'GOTV'},
            {id: 2, name: 'DSTV'},
        ],
    },
];

export default bills;
