const api_key = '9ecb3f6a4566a585475ef747621c1482'
const url = 'https://api.themoviedb.org/3/movie'
const categories = ['popular', 'upcoming', 'top_rated', 'now_playing']


export default async function fetchDataMovies() {

    try {
        const dataPopular = await fetch(`${url}/${categories[0]}?api_key=${api_key}`, { method: 'GET' })
        const dataUpcoming = await fetch(`${url}/${categories[1]}?api_key=${api_key}`, { method: 'GET' })
        const dataTopRated = await fetch(`${url}/${categories[2]}?api_key=${api_key}`, { method: 'GET' })
        const dataNowPlaying = await fetch(`${url}/${categories[3]}?api_key=${api_key}`, { method: 'GET' }) 
        
        const jsonPopular = await dataPopular.json()
        const jsonUpcoming = await dataUpcoming.json()
        const jsonTopRated = await dataTopRated.json()
        const jsonNowPlaying = await dataNowPlaying.json()

        return {
            jsonPopular,
            jsonUpcoming,
            jsonTopRated,
            jsonNowPlaying,
            dataPopular,
            dataUpcoming,
            dataTopRated,
            dataNowPlaying
        }
    } catch(err) {
        console.log(err)
    }

}