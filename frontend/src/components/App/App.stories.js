import App from './App'

const story = {
  title: 'App',
  component: App
}

// create story from this imported component
const AppStory = () => <App></App>

export default story
export { AppStory }