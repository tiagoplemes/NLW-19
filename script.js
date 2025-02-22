const app = document.getElementById("app")

const users = [
    {
        email: 'teste1@gmail.com',
        phone: '123456789',
        ref: 100,
        refBy: null
    },
    {
        email: 'teste2@gmail.com',
        phone: '123456789',
        ref: 200,
        refBy: 100
    },
    {
        email: 'teste3@gmail.com',
        phone: '123456789',
        ref: 300,
        refBy: 100
    }
]

const getUser = (userForm) => {
    return users.find((userArray) => {
        return userForm.email == userArray.email
    })
}

const getTotalSubscribers = (userForm) => {
    const subs = users.filter((user) => {
        return user.refBy == userForm.ref
    })
    return subs.length
}

const showInvite = (userForm) => {
    app.innerHTML = `
        <input type="text" id="link" value="https://evento.com?ref=${userForm.ref}"
         disabled>
    
        <div>
            ${getTotalSubscribers(userForm)}
        </div>
        <h4>
            <p>Inscrições feitas</p>
        </h4>
    `
}

const formAction = () => {
    const form = document.getElementById('form')
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const userForm = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone')
        }

        const user = getUser(userForm)
        
        if(user){
            showInvite(user)
        }else{ 
            alert("Não achei")
        }
    }
}

const startApp = () => {
    const content = `
    <form id="form">
        <input type="name" name="name" placeholder="Seu nome">
        <input type="email" name="email" placeholder="E-mail">
        <input type="text" name="phone" placeholder="Telefone">

        <button>
            Confirmar
        </button>
    </form>
    `
    app.innerHTML = content;

    formAction()
}


startApp()