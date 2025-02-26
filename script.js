const users = [
    {
        email: 'hannah@email.com',
        phone: '123456789',
        ref: 100,
        refBy: null
    },
    {
        email: 'joana@email.com',
        phone: '987654321',
        ref: 200,
        refBy: 100
    },
    {
        email: 'carlos@email.com',
        phone: '123654789',
        ref: 300,
        refBy: 200
    }
]

const getUser = (userData) => {
    return users.find((user) => {
        return user.email === userData.email
    })
}

const getTotalSubscribers = (userData) => {
    const subs = users.filter((user) => {
        return user.refBy === userData.ref
    })
    return subs.length
}

const saveUser = (userData) => {
    const newUser = {
        ...userData,
        ref: Math.round(Math.random() * 4000),
        refBy: 100
    }
    users.push(newUser)
    console.log(users)
    return (newUser)
}

const formAction = () => {
    const form = document.querySelector('form')
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const userData = {
            email: formData.get('email'),
            phone: formData.get('phone')
        }

        const user = getUser(userData)
        if (user) {
            showInvite(user)
        } else {
            const newUser = saveUser(userData)
            showInvite(newUser)
        }
    }
    
}

const showInvite = (userData) => {
    const stats = document.querySelector(".counter-container")
    const inputLink = document.querySelector(".invitation-container")

    const linkRef = document.createElement("input")
    linkRef.id = "link"
    linkRef.type = "text"
    linkRef.value = `devstage.com?ref=${userData.ref}`
    inputLink.prepend(linkRef)

    const totalSubs = document.createElement("h5")
    totalSubs.innerHTML = `${getTotalSubscribers(userData)}`
    stats.prepend(totalSubs)
}

formAction()