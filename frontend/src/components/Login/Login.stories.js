import SignIn from './Login'

const story = {
  title: 'SignIn',
  component: SignIn
}

// create story from this imported component
const Login = () => <SignIn></SignIn>

export default story
export { Login }