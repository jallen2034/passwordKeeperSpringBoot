import Register from './Register'

const story = {
  title: 'Register',
  component: Register
}

// create story from this imported component
const RegisterScreen = () => <Register></Register>

export default story
export { RegisterScreen }