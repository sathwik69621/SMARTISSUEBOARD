## Smart Issue Board

Smart Issue Board is a simple issue-tracking application built as part of an internship assignment.  
The application allows users to create, view, and manage issues with authentication, duplicate detection, and workflow rules.

---

## Tech Stack Used

- Frontend: React + Vite
- Authentication: Firebase Authentication (Email/Password)
- Database: Firebase Firestore
- Hosting: Vercel
- Code Hosting: GitHub

---

## Why I Chose This Frontend Stack

I chose React with Vite because it provides a fast and lightweight development environment with minimal configuration.  
It integrates smoothly with Firebase and allows focusing on business logic rather than setup complexity.  
This stack is well-suited for small to medium production-ready applications.

---

## Firestore Data Structure

I used a single Firestore collection named `issues`.

Each issue document contains the following fields:
- `title` – short description of the issue
- `description` – detailed explanation
- `priority` – Low / Medium / High
- `status` – Open / In Progress / Done
- `assignedTo` – email of the assigned user
- `createdBy` – email of the creator
- `createdAt` – timestamp of issue creation

This structure is simple, scalable, and easy to query for filtering and sorting.

---

## Handling Similar Issues

When a user creates a new issue, the application checks existing issues for similarity using a word-based matching approach.  
Only meaningful words are compared, and a similarity warning is shown if multiple words match.

The user is then given a choice to either:
- Proceed with creating the issue, or
- Cancel the action

This approach avoids duplicate issues without over-engineering the solution.

---

## Status Transition Rule

The application enforces a business rule where an issue cannot move directly from **Open** to **Done**.  
If such an action is attempted, a friendly message is shown asking the user to move the issue to **In Progress** first.

This ensures a proper workflow and reflects real-world issue management practices.

---

## Challenges Faced

- Designing a simple yet effective similar issue detection logic
- Understanding Firestore querying and updates
- Managing authentication state and protected routes

---

## Future Improvements

- Improve UI and user experience
- Add role-based access control
- Implement real-time updates using Firestore listeners
- Enhance similarity detection using advanced techniques

---

## Deployment

The application is deployed on Vercel and uses environment variables for Firebase configuration to ensure security and production readiness.


Live Demo https://smart-issue-board-ten.vercel.app



EXAMPLE:
mail:test123@gmail.com
password:test123

mail:uppusathwik1354@gmail.com
password:22331a4259@CSM
