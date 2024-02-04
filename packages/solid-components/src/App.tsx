import { createSignal, type Component } from 'solid-js'
import { createModelComponent, createResourceComponent } from '../lib'
import { Utilisateur } from './models/Utilisateur.model'

const UtilisateurComponent: Component<Utilisateur> =
  createModelComponent<Utilisateur>()

let valeurRandom = 0
const slowRequest = async () =>
  new Promise<Utilisateur>((resolve) => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('Promise resolved after 1 second')
      }, 1000)
    }).then(() => {
      return resolve({
        couleurPreferee: 'blue',
        nom: 'promesse',
        prenom: 'blbl' + valeurRandom++,
      })
    })
  })

const App: Component = () => {
  const utilisateur: Utilisateur = {
    couleurPreferee: 'blue',
    nom: 'Rabeson',
    prenom: 'Nirina',
  }

  const [counter, setCounter] = createSignal(0)

  const UtilisateurFetch = createResourceComponent<Utilisateur>(
    slowRequest,
    counter,
  )

  return (
    <>
      <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
      <button
        class="duration-10 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 m-4 transform rounded px-4 py-2 font-bold text-white transition-transform ease-in-out active:translate-x-1 active:translate-y-1"
        onClick={() => setCounter((v) => v + 1)}
      >
        Incrémenter
      </button>
      <div class="grid grid-cols-2 max-w-screen-md m-auto">
        <div>
          <UtilisateurComponent {...utilisateur} />
        </div>
        <div>
          <UtilisateurFetch />
        </div>
      </div>
    </>
  )
}

export default App
