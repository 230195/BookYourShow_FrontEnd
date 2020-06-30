import { AxiosConstant } from '../constants/AxiosConstants';

export const GetImagePath = (urlEnd) => {
    console.log(urlEnd)
    return `${AxiosConstant.apiUrl}${urlEnd.split('\\').join('/')}`
}