import { useEffect, useState } from "react";

export const useFetch =  (url, options = {}, dependencies = []) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();



    useEffect(() => {

        try {
            const fetchdata = async () => {
                setLoading(true);
                const response = await fetch(url, options);
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(`${response.statusText}, ${response.status}`);
                }

                setData(responseData);
                setError();
            }
            fetchdata()
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

    }, dependencies)


    return { data, loading, error}
};

export default useFetch;
