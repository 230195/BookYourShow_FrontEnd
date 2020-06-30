import { AxiosConstant } from '../constants/AxiosConstants';

export const GetImagePath = (urlEnd) => {
    return `${AxiosConstant.apiUrl}${urlEnd.split('\\').join('/')}`
}