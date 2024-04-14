
import './App.css'

function App() {
  // console.log(process.env.VITE_APPWRITE_URL) 
  console.log(import.meta.env.VITE_APPWRITE_URL)

  return (
    <>
      <h1>Blog App with Appwrite</h1>
    </>
  )
}

export default App
