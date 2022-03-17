const api_key = '9ecb3f6a4566a585475ef747621c1482'
const url = 'https://api.themoviedb.org/3/tv'
const categories = ['popular', 'top_rated', 'on_the_air', 'airing_today']

export default async function fetchDataTvShow() {
    const dataPopular = await fetch(`${url}/${categories[0]}?api_key=${api_key}`, { method: 'GET' })
    const dataTopRated = await fetch(`${url}/${categories[1]}?api_key=${api_key}`, { method: 'GET' })
    const dataOnTheAir = await fetch(`${url}/${categories[2]}?api_key=${api_key}`, { method: 'GET' })
    const dataAiringToday = await fetch(`${url}/${categories[3]}?api_key=${api_key}`, { method: 'GET' })
  
    const jsonPopular = await dataPopular.json()
    const jsonTopRated = await dataTopRated.json()
    const jsonOnTheAir = await dataOnTheAir.json()
    const jsonAiringToday = await dataAiringToday.json()

    return {
        dataPopular,
        dataTopRated,
        dataOnTheAir,
        dataAiringToday,
        jsonPopular,
        jsonTopRated,
        jsonOnTheAir,
        jsonAiringToday
    }
}