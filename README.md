# React Todo List Application

A modern, feature-rich Todo List application built with React. This application allows users to manage their tasks with features like task addition, removal, completion marking, filtering, and sorting.
![image](https://github.com/user-attachments/assets/fffd6e9e-aa13-4a45-9914-f15176388a16)

![image](https://github.com/user-attachments/assets/0953dce6-cfa1-42e8-bad9-dd79ad4197d6)
![image](https://github.com/user-attachments/assets/d14b55d8-a73a-4d26-9c96-c5f2e0e55886)



## Features

- Add new tasks with input validation
- Mark tasks as complete/incomplete
- Delete tasks
- Filter tasks (All, Active, Completed)
- Sort tasks by date or alphabetically
- Persistent storage using localStorage
- Responsive and modern UI design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Testing

The application includes several test cases to ensure functionality:

1. Task Addition:

   - Add a new task with valid text
   - Try adding an empty task (should be prevented)
   - Verify task appears in the list

2. Task Completion:

   - Mark a task as complete
   - Verify task styling changes
   - Mark a completed task as incomplete
   - Verify task styling reverts

3. Task Deletion:

   - Delete a task
   - Verify task is removed from the list

4. Filtering:

   - Test "All" filter shows all tasks
   - Test "Active" filter shows only incomplete tasks
   - Test "Completed" filter shows only completed tasks

5. Sorting:

   - Test date sorting (newest first)
   - Test alphabetical sorting
   - Verify sort order changes when switching between options

6. Persistence:
   - Add several tasks
   - Refresh the page
   - Verify tasks are still present
   - Verify task completion status is preserved

## Technologies Used

- React
- CSS3
- localStorage for data persistence

## Contributing

Feel free to submit issues and enhancement requests!
#
