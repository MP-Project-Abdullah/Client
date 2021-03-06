# Masterpiece

# User story

- **Register** : As a new user i can create my new account.

- **Login** : As a user i can login into my account with email or username also i can login with google+, and as an admin i can block any user.

- **Logout** : As a user i can logout my account.

- **Show projects** : As a user there well be a page show all kind of projects of all users.

- **New project** : As a user i can upload my new projects and determine a deadline for the project, although the project must be approved by the admin.

- **Donate** : As a user i can donate to other projects before the deadline, or other can donate to my projects before the deadline.

- **Packages** : In each project there well be a section call packages, contain exslusive offers depends on how much i donate.

- **Update project** : As a user i can update my project description or upload new images, although must be approved by the admin.

# Links

- [Trello](https://trello.com/b/I4xUaGQ9/mp-project-abdullah)

- [Server](https://github.com/MP-Project-Abdullah/Server)

- [clinte](https://github.com/MP-Project-Abdullah/Client/blob/main/README.md)

- [Project URL](www.abdullah.com)

## Routers

| URL             | Permissions | Behavior             | Auth           |
| --------------- | ----------- | -------------------- | -------------- |
| /register       | guest       | create new account   |                |
| /login          | guest       | Login                |                |
| /               | guest       | Home page            |                |
| /projects/:kind | guest       | project base on kind |                |
| /project/:id    | guest       | project by id        |                |
| /storys         | guest       | all story            |                |
| /story          | guest       | info story           |                |
| /donate/:id     | user        | donation page        | Authentication |
| /newProject     | user        | create new project   | Authentication |
| /account        | user        | info user            | Authentication |

# UML

![ Diagram ](https://user-images.githubusercontent.com/92247941/146675787-33823d2e-4c50-4bcc-a104-1d7f7665e44d.png)

# Wireframe

[wireframe.pdf](https://github.com/MP-Project-Abdullah/Client/files/7740657/wireframe.pdf)

![Home](https://user-images.githubusercontent.com/92247941/146673150-9826b816-360f-4764-82d7-35d29ee7da8d.png)
![Projects](https://user-images.githubusercontent.com/92247941/146673147-e47d7427-3854-424c-b760-2c14c6cf0369.png)
![Project info compaign](https://user-images.githubusercontent.com/92247941/146673144-0372ff6a-6162-4d17-b823-d6320233a550.png)
![Project info comment](https://user-images.githubusercontent.com/92247941/146673142-2d4e658c-936e-471b-9a0b-cd0971b8e40b.png)
![Account](https://user-images.githubusercontent.com/92247941/146673149-e0b6a253-36ba-4eec-950d-166efe08b28d.png)
![Account edit](https://user-images.githubusercontent.com/92247941/146673148-258cb6c6-6bbd-409c-9a66-515da97a2f95.png)
![New project](https://user-images.githubusercontent.com/92247941/146673151-178803f2-a05c-48ba-bc13-98fa66c7bf85.png)
