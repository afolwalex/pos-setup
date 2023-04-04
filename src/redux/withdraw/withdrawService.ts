import axios from 'axios';
import {url} from '../config';
import {headers} from '../headers';

const cardWithdrawal = async (obj: any) => {
    const {data} = await axios.post(`${url}/terminal/withdraw`, obj, {headers});
    return data.data;
};

const withdrawService = {
    cardWithdrawal,
};

export default withdrawService;
