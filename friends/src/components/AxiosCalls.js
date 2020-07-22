import {axiosWithAuth} from '../utils/axiosWithAuth'

export const getFriends = () => {
    axiosWithAuth()
        .get('/api/friends')
        .then(res => {//res.data
            setFriends({...friends,
                isLoading: false,
                friends: res.data})
            }
        )
        .catch(err => console.log(err.message))
}
