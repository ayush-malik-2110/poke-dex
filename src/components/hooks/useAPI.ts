import { useEffect, useState } from 'react'
import axios, { AxiosResponse, AxiosHeaderValue } from 'axios'

import { AXIOS_METHODS } from '../../vendors/axios'

export type UseApiProps = {
  url: string;
  method: string;
  data?: any;
  headers?: { [key: string]: string };
};

export const useAPI = ({
                         url,
                         method,
                         data = null,
                         headers,
                       }: UseApiProps) => {
  const [response, setResponse] = useState(null as any)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  axios.defaults = {
    headers: {
      'Content-type': 'application/json' as AxiosHeaderValue,
      'Accept': 'application/json' as AxiosHeaderValue,
    },
  }

  const fetchData = () => {
    axios({
      url: url as string,
      method: method as AXIOS_METHODS,
      headers: headers,
      data: JSON.parse(data),
    })
      .then((res: AxiosResponse) => {
        setResponse(res.data)
      })
      .catch((err: Error) => {
        return setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [method, url])
  return { response, error, loading }
}
