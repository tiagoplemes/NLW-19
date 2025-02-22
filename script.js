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

const saveUser = (userForm) => {
    const newUser = {
        ...userForm,
        ref: Math.round(Math.random() * 50000),
        refBy: 100
    }

    users.push(newUser)
    return newUser
}

const showInvite = (userForm) => {
    app.innerHTML = `
        <main>
            <h3>Inscrição Confirmada</h3>
            <p>
                Convide mais pessoas e concorra a prêmios! <br/>
                Compartilhe o link e acompanhe as inscrições:
            </p>
            <div class="input-group">
                <label for="link">
                    <img src="link.svg" alt="Link icon">
                </label>
                 <input type="text" id="link" value="https://evento.com?ref=${userForm.ref}"
                    disabled>
            </div>
        </main>

        <section class="stats">
            <h4>
                ${getTotalSubscribers(userForm)}
            </h4>
            <p>
                inscrições feitas
            </p>
        </section>
    `
    app.setAttribute("class", "page-invite")
    updateImageLogo()
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
            const newUser =  saveUser(userForm)
            showInvite(newUser)
        }
    }
}

const updateImageLogo = () => {
    document.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute('src');  // Obtém o caminho original da imagem
        const newSrc = src.search("img") ? `img/${src}` : src;  // Adiciona o caminho relativo da pasta img
        img.setAttribute('src', newSrc);  // Substitui o src pela nova URL
    })
}

const startApp = () => {
    const content = `
    <main>
            <section class="about">
                <div class="section-header">
                    <h2>
                        Sobre o evento
                    </h2>
                    <span class="badge">AO VIVO</span>
                </div>

                <p>
                    Um evento feito por e para pessoas desenvolvedoras 
                    apaixonadas por criar soluções inovadoras e 
                    compartilhar conhecimento. Vamos mergulhar nas 
                    tendências mais recentes em desenvolvimento de 
                    software, arquitetura de sistemas e tecnologias 
                    emergentes, com palestras, workshops e hackathons.
                    <br/><br/>
                    Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito 
                </p>
            </section>

            <section class="registration"> 
                <h2>Inscrições</h2>

                <form id="form">
                    <div class="input-wrapper">
                        <div class="input-group">
                            <label for="email">
                                <img src="mail.svg" alt="Email icon">
                            </label>
                            <input type="email" name="email" id="email"
                                placeholder="E-mail">
                        </div>

                        <div class="input-group">
                            <label for="phone">
                                <img src="phone.svg" alt="Phone icon">
                            </label>
                            <input type="text" name="phone" id="phone"
                                placeholder="Telefone">
                        </div>

                        <button>
                            Confirmar
                            <img src="arrow.svg" alt="Arrow right">
                        </button>
                    </div>
                </form>
            </section>
        </main>
    `
    app.innerHTML = content;

    updateImageLogo()

    formAction()
}

startApp()

document.querySelector("header").onclick = () => startApp()