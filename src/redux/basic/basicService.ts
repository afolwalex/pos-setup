import axios from 'axios';
import {url} from '../config';
import {headers} from '../headers';

const loginAgent = async (obj: any) => {
    const {data} = await axios.post(`${url}/terminal/login`, obj, {headers});
    return data.data;
};

const basicService = {
    loginAgent,
};

export default basicService;
