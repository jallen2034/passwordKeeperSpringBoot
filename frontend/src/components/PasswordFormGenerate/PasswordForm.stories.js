import PasswordForm from "./PasswordForm";

const story = {
  title: 'PasswordForm',
  component: PasswordForm
}

// create story from this imported component
const PasswordDisplayForm = () => <PasswordForm></PasswordForm>

export default story
export { PasswordDisplayForm }