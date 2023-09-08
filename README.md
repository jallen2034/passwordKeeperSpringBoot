## Project Description

Created by Jacob Allen. This project is a work in progress.

PasswordKeepR is a storage system for passwords for personal use. The app will let a user generate a new password for their logged-in account (just like LastPass). Users will be able to generate a password based on the options the form will provide. Some of the options are: password length, contains lowercase, contains uppercase, contains numbers, and contains symbols.

If a user needs to log in to a specific website (e.g., Facebook), they can go into the app, find the appropriate password, they can also click a button which copies the password into the clipboard and log in.

### Tech Stack

Languages:

- Java 11
- JavaScript
- TypeScript
- SQL (Postgres)

Libraries and Frameworks

- React with Create-React-App and Material-UI
- Spring Boot with Spring Data JPA and Spring Security

Database:

- PostgreSQL

### Features

- Full user registration and login.
- Encryption of all user's master passwords using Bcrypt and a salt being the user's email address (like LastPass).
- Users' email addresses are fully encrypted and decrypted using AES like I did for their passwords in the password vaults. Less plaintext.
- All user passwords stored in each user's password vault are fully encrypted using AES. Each user's master password (which is a hashed email + password using bcrypt) is used as a key to encrypt and decrypt all of the passwords in each user's password vault. Better security, no more plaintext!
- Added a limit on how many times a user can attempt to log in with an incorrect password. Lock out their account on too many attempts for 20 minutes. Preventing brute force attacks.
- Used the have i been pwned API to inform a user if any of the passwords in their password vault have been in a data breach, and urging them to change it if so.
- Email verification of user accounts upon creation.
- Users can reset their master password via their email if they forget it.
- There is a 20-minute timeout on the password reset email when sent before it is rendered invalid.
- Users can create, edit and delete passwords from their password vault.
- Sections of the app are protected from improper use/access with React Router.

### Known Issues

**Registration Email Issue:** Currently, the registration process may not work as expected due to an issue with the Spring Boot starter mail service. The demo mail account used for sending verification emails has become inactive after two years. I apologize for the inconvenience.

**Status:** Currently investigating a long-term solution to restore email functionality.

**Workaround:** While I work on a fix, you can try register a user from the registration page, then manually update the 'enabled' flag for that user from the Postgres DB from 'False' to 'True' to then bypass the email verification and login. 

1. Open your terminal and log into your PostgreSQL database using the following command (replace `your_username` with your actual PostgreSQL username):
```bash
psql -U your_username
```
2. Connect to the database (assuming you've already followed the setup steps):

```sql
\c passwordkeeper
```
3. Run the following SQL command to update the 'enabled' status of all existing users to 'TRUE,' enabling them to log in without email verification:

```sql
UPDATE users
SET enabled = true;
```
This workaround will allow users to access their accounts until we resolve the email issue. I appreciate your patience as I work on a permanent solution.

### TODO

- Enhance the project by migrating away from Create-React-App and adopting Next.js. This will unlock server-side rendering (SSR) capabilities and a host of other features, taking the user experience to the next level.
- Containerize both the Frontend and Backend using Docker to streamline and accelerate development processes.
- Write unit tests for my API using Junit.
- Write tests for my components on the frontend using the React Testing Library + jest. 
- Set up a CI pipeline for testing.
- Clean up clutter/unnecessary files in the repo.
- Refactor backend Java code to be more clear and readable.
- Refactor react frontend code to be more clear and readable.
- Set up a way to handle database migrations from one version to the next.
- Fix styling on the frontend to make the app responsive on all screen sizes.
- For each password displayed to the user, tell them how strong or weak it is. If it is too weak, suggest they change it to something stronger.
- Add a search bar to the password vault.
  
### TypeScript Integration

TypeScript has been incrementally added to enhance type safety and improved code quality.

### Setup Instructions (Backend)

To run the backend of the project, you'll need to have the following prerequisites:

- Java Development Kit (JDK) 11 or later.
- Apache Maven.

Once you have the prerequisites installed, you can follow these steps:

1. Clone the repository: `git clone https://github.com/jallen2034/passwordKeeperSpringBoot.git`
2. Navigate to the backend directory: `cd passwordKeeperSpringBoot`

### Database Setup
4. Before proceeding, ensure you have PostgreSQL installed and running on your machine.
5. Create a PostgreSQL database for the application locally on your machine. For Windows users, I recommended to use Windows Subsystem for Linux (WSL) for database setup, as it can simplify the process. If you're not using WSL, make sure you have PostgreSQL properly configured.
6. Open your terminal and log into your PostgreSQL database using the command:
```bash
psql -U your_username
```
7. Create a New Database: Run the following SQL command in the PostgreSQL terminal to create a new database named PasswordKeeperDB. This database will store application data:

```sql
CREATE DATABASE PasswordKeeperDB;
```
Now connect to the database: 

```sql
\c passwordkeeper
```

5. Import the database schema by running the provided SQL script in the PostgreSQL terminal while connected ot the database. The script defines the necessary tables and relationships for the application. You can find the Entity-Relationship Diagram (ERD) for the database  [here](https://github.com/jallen2034/passwordKeeperSpringBoot/blob/master/docs/ERD/ERD.PNG).

(Note: As this application is primarily intended for experimentation and learning purposes, some database fields have been left as nullable (not marked as 'NOT NULL'). In a production environment, it's strongly recommended to enforce data integrity by making these fields 'NOT NULL' wherever applicable for improved reliability and security)

Now 

```sql
-- Create the 'users_organizations' table to manage relationships between users and organizations.
CREATE TABLE "users_organizations" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER,
    "organization_id" INTEGER
);

-- Create the 'passwords' table to store password-related information.
CREATE TABLE "passwords" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER,
    "organization_id" INTEGER,
    "category" VARCHAR(255),
    "url" VARCHAR(255),
    "password_text" VARCHAR(255),
    "pwned" BOOLEAN
);

-- Create the 'organizations' table to store organization details.
CREATE TABLE "organizations" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255)
);

-- Create the 'users' table to store user account information.
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255),
    "master_password" VARCHAR(255),
    "enabled" BOOLEAN,
    "verification_code" VARCHAR(255),
    "timestampPwReset" TIMESTAMP(0) WITHOUT TIME ZONE,
    "failed_attempt" INTEGER,
    "account_non_locked" BOOLEAN,
    "lock_time" TIMESTAMP(0) WITHOUT TIME ZONE
);

-- Define foreign key constraints to establish many-to-many relationships between tables.
-- Set these up to allow a user to be associated with multiple organizations and an organization to have multiple users.

-- Define a foreign key from 'users_organizations' to 'organizations'.
ALTER TABLE "users_organizations"
    ADD CONSTRAINT "fk_users_org_organization_id"
        FOREIGN KEY("organization_id") REFERENCES "organizations"("id");

-- Define a foreign key from 'passwords' to 'organizations'.
ALTER TABLE "passwords"
    ADD CONSTRAINT "fk_passwords_org_organization_id"
        FOREIGN KEY("organization_id") REFERENCES "organizations"("id");

-- Define a foreign key from 'passwords' to 'users'.
ALTER TABLE "passwords"
    ADD CONSTRAINT "fk_passwords_user_user_id"
        FOREIGN KEY("user_id") REFERENCES "users"("id");

-- Define a foreign key from 'users_organizations' to 'users'.
ALTER TABLE "users_organizations"
    ADD CONSTRAINT "fk_users_org_user_id"
        FOREIGN KEY("user_id") REFERENCES "users"("id");
```

6. Build the Spring Boot project by running the following command in the terminal: `mvn clean install`
7. Start the application by running the following command in the terminal: `mvn spring-boot:run`

I'm currently planning to dockerize this app to simplify the setup process. I understand that setting this up manually can be a hassle.

### Setup Instructions (Frontend)

To run the frontend of the project, you'll need to have the following prerequisites:

- Node.js
- npm

Once you have the prerequisites installed, you can follow these steps:

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

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
