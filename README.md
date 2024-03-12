
# Cooee Project-1

This project is the frontend application for a web app that provides insightful data analysis in a user-friendly tabular format. Users can easily search, sort, and paginate through the data, offering a seamless experience. The application is designed to allow anyone to view the data, while only logged-in members have the privilege to create new data entries.


## About Cooee
[Cooee](https://www.letscooee.com/) is a cutting-edge tech company that specializes in using Machine Learning (ML) to optimize e-commerce brand conversions. They provide innovative solutions to empower businesses with actionable insights and data-driven strategies.

## Tech Stack
- Angular version 16.2.12


## Dependencies and Installation
- bootstrap@5.3.3
- Angular Material
- ngx-toastr
- jwt-decode

To install all the importnat dependencies
```bash
  npm i
```

## Running the app



To run this project on your localhost
```bash
  ng serve
```

Navigate to http://localhost:4200/. 
NOTE: The application will automatically reload if you change any of the source files.
## Features

- View data in a tabular format with ease.
- Efficient search functionality to find specific data entries.
- Dynamic sorting options for better data organization.
- Pagination for seamless navigation through the data.
- Create new data entries (available to logged-in members).


## Validation
- Frontend validation ensures data integrity by preventing empty field submissions.
- Date fields are validated to ensure they are in ISO 8601 format.

## Acknowledgements
- This project uses Angular for frontend development.
- Bootstrap and Angular Material for modern and responsive UI elements.
- ngx-toastr for displaying user-friendly toast notifications.
- jwt-decode for decoding JWT tokens.


## Future Scope
- Implementation of update and delete features on the table
- Implementation of pagination in the in NestJS instead of Angular for huge data sets
- Implementation of search functionality in NestJS instead of Angular, for optimal load time in cases of huge data sets.

## Backend Repository

The backend services for this project are implemented in a separate repository. You can find the backend codebase and documentation at the following link:

- [Backend Repository](https://github.com/DeepAakash/cooee-project1-api)

Feel free to explore the backend repository for more details on the server-side implementation.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
    