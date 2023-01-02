import axios from 'axios'
import useSWR from 'swr'

const useFetchApi = (url: string) => {
    const fetcher = (url: string) => axios.get(url).then(res => res.data)
    const { data: response, error } =  useSWR(url, fetcher)
    const data = response?.data ? response.data : undefined;
    return {
        data,
        ok: response?.data !== undefined || false,
        error: !response?.ok ? response?.data : error,
        isLoading: (!response && !error) || !data,
    }
}

export default useFetchApi;