import PasswordEntry from "./PasswordEntry"

const story = {
  title: 'PasswordEntry',
  component: PasswordEntry
}

// create story from this imported component
const PasswordEntryStory = () => <PasswordEntry></PasswordEntry>

export default story
export { PasswordEntryStory }