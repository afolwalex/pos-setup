import axios from 'axios';
import {url} from '../config';
import {headers} from '../headers';

const loginAgent = async (obj: any) => {
    const {data} = await axios.post(`${url}/terminal/login`, obj, {headers});
    return data.data;
};

const getAgent = async (id: string) => {
    const {data} = await axios.get(`${url}/terminal/${id}`, {headers});
    return data.data;
};

const changePin = async (obj: any) => {
    const {data} = await axios.post(`${url}/terminal/change-pin`, obj, {
        headers,
    });
    return data.data;
};

const basicService = {
    loginAgent,
    getAgent,
    changePin,
};

export default basicService;
