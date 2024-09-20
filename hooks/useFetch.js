import { useEffect, useState } from "react"

const localCache = {};


export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    });

    useEffect(() => {
        getFetch(url);
    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        })
    }
    

    const getFetch = async (url) => {

        if( localCache[url] ) {
            console.log("usando cache");
            setState({
                data: localCache[url],
                idLoading: false,
                hasError: false,
                error: null
            });
            return;
        }

        setLoadingState();

        const resp = await fetch(url);

        //await new Promise( resolve => setTimeout(resolve, 1500) );

        if( !resp.ok ) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: resp.statusText,
            })
        }

        const data = await resp.json();

        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        })
        
        //! manejo de la cache
        localCache[url] = data;

    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    }
}
