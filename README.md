## Project Description

Created by Jacob Allen. This project is a work in progress.

PasswordKeepR is a storage system for passwords for personal use. The app will let a user generate a new password for their logged in account (just like LastPass). Users will be able to generate a password based on the options the form will provide. Some of the options are: password length, contains lowercase, contairs uppercase, contains numbers, and contains symbols.

If a user needs to log in to a specific website (e.g. Facebook) they can go into the app, find the appropriate password, they can also click a button which copies the password into the clipboard, and log in.

## Tech stack

Languages:

- Java 11
- JavaScript
- SQL

Libraries and Frameworks

- React with Material-UI
- Spring Boot with Spring Data JPA and Spring Security

Database:

- PostgreSQL

## Features

- Full user registration and login.
- Encryption of all users master passwords using Bcrypt and a salt being the users email address (like LastPass).
- All user passwords stored in each users password vault are fully encrypted using AES. Each users master password (which is a hashed email + password using bcrypt) is used as a key to encrypt and decrypt all of the passwords in each users password vault. Better security, no more plaintext!
- Added a limit on how many times a user can attempt ot login with an incorrect password. Lock out their account on too many attempts for 20 minutes. Preventing brute force attacks.
- Email verification of user accounts upon creation.
- Users can reset their master password via their email if they forget it.
- There is a 20 minute timeout on the password reset email when sent before it is rendered invalid.
- Users can create, edit and delete passwords from their password vault.
- Sections of the app are protected from improper use/access with React Router.

## TODO

- Fully encrypt and decrypt all users email addresses and website urls using AES like I did for their password vaults. So my database has zero plaintext in it entirely. Added security.
- Write unit tests for my API using Junit.
- Setup a CI pipeline for testing.
- Use the Have I Been Pwned API to determine if a website that user has a password on has been compromised or not. If so notify the user they MUST change it immediatly.
- Clean up clutter/unnecessary files in repo.
- Refactor backend Java code to be more clear and readable.
- Refactor react frontend code to be more clear and readable.
- Setup a way to handle database migrations from one version to the next.
- Fix styling on frontend to make app responsive on all screen sizes.
- Add search bar to password vault.

## Screenshots

Register page:

!["Register page"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/register.png)

Register Failure:

!["Register fail"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/registerFail.png)

Register Success:

!["Register success"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/registerSuccess.png)

Register Email:

!["Register success"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/emailRegister.png)

Login page:

!["Login page"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/login.png)

Login failure:

!["Login fail"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/loginFail.png)

Create Password Generation:

!["Create PW"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/createPasswordGenerate.png)

Create Password Input Error:

!["Create I Error"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/createPasswordDuplicateError.png)

Create Password Duplicate Error:

!["Create PW dup error "](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/createPasswordInputError.png)

Create Password Typed:

!["Create PW typed"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/createPasswordTyped.png)

Editing a password in the vault:

!["Editing pw"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/editingPassword.png)

Edited password in the vault:

!["Edited pw"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/editedPassword.png)

Deleting password in the vault:

!["Deleting pw"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/deletingPassword.png)

Password deleted in the vault:

!["Deleted pw"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/passwordDeleted.png)

Reset password email page:

!["Reset pw email"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/resetPasswordEmail.png)

Reset password email:

!["Reset pw email pw"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/passwordResetEmail.png)

Reset password Error:

!["Reset pw failure pw"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/resetPasswordError.png)

Reset password success:

!["Reset pw failure pw"](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/Screenshots/passwordResetSuccess.png)
