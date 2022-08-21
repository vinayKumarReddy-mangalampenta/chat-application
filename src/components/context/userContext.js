import React from 'react'

const userContext = React.createContext({
    username: '',
    changeName: () => { },
})

export default userContext