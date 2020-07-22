import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialFriends = {
    friends: [],
    isLoading: true,
    newFriend: {
        name:'',
        age:0,
        email:''
    }
}

const FriendsList = () => {
    const [ friends, setFriends ] = useState(initialFriends)

    const handleFriends = e => {
        setFriends({...friends, newFriend: 
            {...friends.newFriend,
                [e.target.name]:e.target.value
        }
        })
    }
    const getFriends = () => {
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
    const addFriend = e => {
        e.preventDefault()
        axiosWithAuth()
            .post('/api/friends', friends.newFriend)
            .then(res => {
                getFriends()
            })
            .catch(err => console.log(err.message))
    }
    
    useEffect(getFriends,[])
    return (
        <div>
                <form onSubmit={addFriend}>
                <label>Name:&nbsp;
                    <input 
                    type='text'
                    name='name'
                    value={friends.newFriend.name}
                    onChange={handleFriends}
                    placeholder='Enter Friend Name'
                    />
                </label>
                <label>Age:&nbsp;
                    <input 
                    type='text'
                    name='age'
                    value={friends.newFriend.age}
                    onChange={handleFriends}
                    placeholder='Enter Friend Age'
                    />
                </label>
                <label>Email:&nbsp;
                    <input 
                    type='text'
                    name='email'
                    value={friends.newFriend.email}
                    onChange={handleFriends}
                    placeholder='Enter Friend Email'
                    />
                </label>
                <button type='submit'>Add new Friend!</button>
            </form> 

            {friends.isLoading ? <p>Pulling up FRIENDS!</p> : 
                (friends.friends.length > 0 && friends.friends.map(friend => {
                    return (
                        <div key={friend.id}>
                            <h2>Hi! I'm {friend.name}</h2>
                            <h3>I am {friend.age} years old</h3>
                            <h3>You can reach me at: {friend.email}</h3>
                        </div>
                    )
                }))
            }
        </div>
    )
}

export default FriendsList