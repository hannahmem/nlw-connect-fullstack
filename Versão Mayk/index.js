const app = document.getElementById("app")
// estrutura de dados
// arrays tambem sao considerados objetos no JS
const users = [
  {
    email: 'test@test.com',
    phone: '999999999',
    // numero de referencia do usuario
    ref: 100,
    // referenciado por alguem
    refBy: null
  },
  {
    email: 'tust@tust.com',
    phone: '9999999999',
    ref: 200,
    refBy: 100
  },
  {
    email: 'tost@tost.com',
    phone: '9999999999',
    ref: 300,
    refBy: 200
  }
]

const getUser = (userData) => {
  return users.find((user) => {
    return user.email == userData.email 
  })
}

const getTotalSubscribers = (userData) => {
  const subs = users.filter((user) => {
    return user.refBy == userData.ref
  })
  return subs.length
}

const showInvite = (userData) => {
    // disabled: nao permite que se mude a informacao de value
  app.innerHTML = `
    <main>
      <h3>Inscrição confirmada!</h3>
      <p>
        Convide mais pessoas e concorra a prêmios!<br/>
        Compartilhe o link e acompanhe as inscrições:
      </p>

      <div class="input-group">
            <!-- for -> automaticamente linkado a um input -->
        <label for="link">
          <img src="link.svg" alt="Link icon">
        </label>
        <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>

      </div>
    </main>

    <section class="stats">
      <h4>
        ${getTotalSubscribers(userData)}
      </h4>
      <p>Inscrições feitas</p>
    </section>
  `

  app.setAttribute('class', 'page-invite')
  updateImageLinks()
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
  const form = document.getElementById('form')
  form.onsubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const userData = {
      email: formData.get('email'),
      phone: formData.get('phone'),
    }

    const user = getUser(userData)
    if (user) {
      // encontrado
      showInvite(user)
    } else {
      // nao encontrado
      const newUser = saveUser(userData)
      showInvite(newUser)
    }
  }
}

const updateImageLinks = () => {
  document.querySelectorAll('img').forEach((img) => {
    if (img.src.includes('githubusercontent')) {
      return
    }
    const src = img.getAttribute('src')
    img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`
  })
}

const startApp = () => {
  const content = `
  <main>
    <section class="about">
      <div class="section-header">
        <h2>Sobre o evento</h2>
        <span class="badge">AO VIVO</span>
      </div>

      <p>
        Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.<br/><br/> 
        Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito
      </p>
      </section>
      <section class="registration">
        <h2>Inscrição</h2>

        <form id="form">
          <div class="input-wrapper">
            <div class="input-group">
              <label for="email">
                <img src="mail.svg" alt="Email icon">
              </label>
              <input type="email" name="email" id="email" placeholder="E-mail">
            </div>
            <div class="input-group">
              <label for="phone">
                <img src="phone.svg" alt="Phone icon">
              </label>
              <input type="text" name="phone" id="phone" placeholder="Telefone">
            </div>
          </div>

          <button>
            Confirmar
            <img src="arrow.svg" alt="Arrow right">
          </button>
        </form>
      </section>
  </main>
  `
  app.innerHTML = content
  app.setAttribute('class', 'page-start')
  updateImageLinks()
  formAction()
}

// showInvite({
//   email: 'test@test.com',
//   phone: '999',
//   ref: 100,
// })

startApp()

document.querySelector('header').onclick = () => startApp()