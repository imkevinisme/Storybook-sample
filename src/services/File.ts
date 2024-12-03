import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface UploadProgress {
    loaded: number
    total: number
    data?: any
}

interface UploadRequestConfig extends AxiosRequestConfig {
    headers: {
        'Content-Type': string;
        'Authorization': string;
        'direct-access-appid': string;
    },
    onUploadProgress: (progressEvent: any) => void
}

const FileService = {

    singleUpload: async ( file: File, onProgress?: (progress: UploadProgress) => void ): Promise<UploadProgress> => {

        const formData = new FormData()
            formData.append('file', file);

        return new Promise(async (resolve, reject) => {
            const URL = '/api/uploads';
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent: ProgressEvent<EventTarget>) => {
                    const { loaded, total } = progressEvent;
                    onProgress?.({ loaded, total })
                }
            } as UploadRequestConfig;

            axios
                .post(URL, formData, config)
                .then( async (response: AxiosResponse) => {
                    const { data } = response
                    // console.log('Media Upload Response:', data);
                    resolve({ data, loaded: 100, total: 100 })
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export default FileService;
