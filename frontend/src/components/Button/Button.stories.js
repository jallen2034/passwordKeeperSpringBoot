import SimpleButton from './Button'

const story = {
  title: 'Button',
  component: SimpleButton
}

// create story from this imported component
const Button = () => <SimpleButton></SimpleButton>

export default story
export { Button }