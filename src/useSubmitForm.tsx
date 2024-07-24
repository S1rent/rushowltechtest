import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import { IFormStateProp } from "./Form";

const baseUrl = "https://www.sample.app";

export interface IResponseWrapper {
    data: IResponse
}

export interface IResponse {
    statusCode: number;
    message: string;
}

export const useSubmitForm = () => {
  const [responseData, setResponseData] = useState<IResponseWrapper | undefined>();
  const submitData = useCallback(async (params: IFormStateProp) => {
    try {
      const _ = await axios.post(`${baseUrl}/login`, params);

      setResponseData({
        data: {
            statusCode: 200,
            message: 'Successfully submit the data',
        }
      });
    } catch (err: any) {
      console.log("Error when submit " + err.message);
    } finally {
      // Mock the response in the finally block, 
      // because it seems that its not a real api
      // in real case should set in the try if it success and catch if its error
      setResponseData({
        data: {
            statusCode: 200,
            message: 'Successfully submit the data',
        }
      });
    }
  }, []);

  const data = useMemo(() => {
    return responseData?.data;
  }, [responseData]);

  return {
    submitData,
    data,
  };
};
