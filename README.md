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

# Trello

[Trello](https://trello.com/b/I4xUaGQ9/mp-project-abdullah)

# UML

![Screenshot (133)](https://user-images.githubusercontent.com/92247941/146355647-546d7063-c5e4-4e6f-8c99-73f555f88a6a.png)

## Routers

| URL             | Permissions | Behavior             |
| --------------- | ----------- | -------------------- |
| /register       | Public      | create new account   |
| /login          | Public      | Login                |
| /               | Public      | Home page            |
| /projects/:kind | Public      | project base on kind |
| /project/:id    | Public      | project by id        |
| /storys         | Public      | all story            |
| /story          | Public      | info story           |
| /donate/:id     | Private     | donation page        |
| /newProject     | Private     | create new project   |
| /account        | Private     | info user            |


# Wireframe 

[wireframe.pdf](https://github.com/MP-Project-Abdullah/Client/files/7740657/wireframe.pdf)

