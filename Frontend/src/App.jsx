import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../utils/firebase"
import api from "../utils/axios"

function App() {

  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/auth/login", { token })
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider)

      const token = await data.user.getIdToken()

      console.log("Firebase token:", token)

      await handleLogin(token)

      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <button
        className='w-50 h-24 bg-white'
        onClick={googleLogin}
      >
        Continue with Google
      </button>
    </div>
  )
}

export default App