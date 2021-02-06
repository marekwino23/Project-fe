export const getURL = () => {
    const URL = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_API : 'https://infinite-island-52535.herokuapp.com/'
    console.log('url: ', URL);
    return URL;
}