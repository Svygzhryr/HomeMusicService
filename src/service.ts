// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
    'BQBdsZXluFl5rwQIj2HqQgscXr7GKu7AIea32CjhpP6S_5gpduEMnDpt768xWMwf9AwYmQMMoyC8Ymwkl78UwrC7HpALdSmk6D1xxTh40agwxOiCP8H_HR3bdTrqBKXClgfRqGXktcbkQ8hjEjn0UA1oJnYtrtPMGEAWeP0uP5MJvE8ZVKVxtYlg0c_SN_5ZM9Hv0sqYg7UWlQRRIvDuMpc1CCbc3800O-jhHuxC9BaVZTNe0e1DXuLuDHWinufPkuGFd_2IpoK2eBXx4tYZGo7N'

export async function fetchWebApi(endpoint: string, method: string) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
    })
    return await res.json()
}

export async function getTopTracks() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (
        await fetchWebApi(
            'v1/me/top/tracks?time_range=long_term&limit=5',
            'GET'
        )
    ).items
}

export const body = await getTopTracks()
