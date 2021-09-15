import PasswordVault from './PasswordVault'

const story = {
  title: 'PasswordVault',
  component: PasswordVault
}

// create story from this imported component
const PasswordVaultStory = () => <PasswordVault></PasswordVault>

export default story
export { PasswordVaultStory }