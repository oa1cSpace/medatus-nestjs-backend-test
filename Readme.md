# Introduction

First of all, thank you for your participation. We are a small startup with limited resources, but we have ambitious plans and even bigger dreams. Our goal is to change the way how people and healthcare service provider connect with each other. To achieve that, we require developers who are highly motivated and have a solid foundation of knowledge for our required technology stack. Once again, thank you for your participation.

# Task:
Your objective is to implement a Rest API that manages registration, login, and change password functionality.

## Task summary:
The following is a brief description of the needed functionality. To understand what technical details the implementation has to cover, please take a look at the  below.

### Registration
A user can register (`POST: { username: string, password: string }` at `/register`) an account by providing a valid email address and a password. If the registration is valid, meaning the user's email and password were accepted, a correct response as a `json` object will be given.

### Login
They can log in (`POST: { username: string, password: string }` at `/login`). If successfully logged in, a session is returned.

### Password change
User can change its current password (`POST: { session: object, oldPassword: string, newPassword: string }` at `/user/change-password`). If changing the password is successful, the current session will be revoked and the user as to login again.

# General Architecture Guidelines
The following guidelines are part of the implementation requirements. Please utilize available node.js modules to achieve the desired behavior, document what functionality you utilize from external and what functionality has been added by you.

## Authentication

### User IDs
Make sure your usernames/user IDs are case-insensitive. User 'smith@gmail.com' and user 'Smith@gmail.com' should be the same user. Usernames should also be unique, and therefore we will use the email address as the username.

#### Username validation
Properly parsing email addresses for validity with regular expressions is very complicated.

The biggest caution on this is that although the RFC defines a very flexible format for email addresses, most real-world implementations (such as mail servers) use a far more restricted address format, meaning that they will reject addresses that are technically valid. Although they may be technically correct, these addresses are of little use if your application will not be able to actually send emails to them. Your implementation has to check for the following facts:

- The email address contains two parts, separated with an `@` symbol.
- The email address does not contain dangerous characters (such as backticks, single or double quotes, or null bytes).
  - Exactly which characters are dangerous will depend on how the address will be used (echoed in page, inserted into database, etc.).
- The domain part contains only letters, numbers, hyphens (`-`) and periods (```.).
- The email address is a reasonable length:
  - The local part (before the `@`) should be no more than 63 characters.
  - The total length should be no more than 254 characters.

In a real application, the semantic validation is about determining whether the email address is correct and legitimate. The most common way to do this is to email the user, and require that they click a link in the email, or enter a code that has been sent to them. Semantic validation is not part of this implementation.

### Proper Password Strength Controls
A key concern when using passwords for authentication is password strength. A “strong” password policy makes it difficult or even improbable for one to guess the password through either manual or automated means. The following characteristics define a strong password and need to be implemented:

- Password Length
- Minimum length of the passwords should be enforced by the application. Passwords shorter than 8 characters are considered to be weak (NIST SP800-63B).
- Maximum password length should not be set too low, as it will prevent users from creating passphrases. A common maximum length is 64 characters due to limitations in certain hashing algorithms. It is important to set a maximum password length to prevent long password Denial of Service attacks.
- Password rotation for every 180 days after login.
- It is essential to store passwords in a way that prevents them from being obtained by an attacker even if the application or database is compromised. The majority of modern languages and frameworks provide built-in functionality to help store passwords safely.
After an attacker has acquired stored password hashes, they can always brute force hashes offline. As a defender, it is only possible to slow down offline attacks by selecting hash algorithms that are as resource intensive as possible. So for this task implement the password hash using bcrypt, use a work factor of 10 or more and with a password limit of 72 bytes.
- Include password strength meter to help users create a more complex password and block common and previously breached passwords by using the great [zxcvbn](https://github.com/zxcvbn-ts/zxcvbn) library.

### Session Management