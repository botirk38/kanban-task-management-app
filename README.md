
# 📋 Kanban Task Management Web App

This application aims to provide a seamless experience for task management through the Kanban methodology. With its user-friendly interface, you can effortlessly manage tasks, track their status, and achieve productivity.

![Desktop Light](/public/images/desktop-img-light.png)
![Desktop Dark](/public/images/desktop-img-dark.png)
![Tablet](/public/images/tablet-img.png)
![Mobile](/public/images/mobile-img.png)

## ✨ Features

- **Responsive Design**: Adaptable interface that looks great on both desktop and mobile devices.
- **Light & Dark Mode**: Choose your preference and work in an environment that suits you best.
- **Multiple Boards**: Create, edit, and delete boards to manage multiple projects or teams.
- **Comprehensive Task Management**: Add subtasks, toggle their completion status, set task descriptions, and more.
  
## 🧠 What I Learned

One of the core components of this project was state management. Through the process of building the Kanban Task Management App, I dived deep into the realms of React context and reducers. It provided a centralized way to manage the state of my application, making it more readable and maintainable.

### Reducer Function: A Deep Dive

Reducers are functions that take the current state and an action as arguments, and return a new state. They become extremely useful when you want to keep track of how your state is changing over time, especially in applications with complex state logic.

```typescript
export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload };
        // ... other cases
        case 'UPDATE_SUBTASK':
            return {
                ...state,
                subtasks: state.subtasks.map((subtask, index) => {
                    if (index === action.payload.index) {
                        return { ...subtask, title: action.payload.title };
                    }
                    return subtask;
                })
            };
        default:
            return state;
    }
}
```

**Key Takeaways**:
1. **Immutability**: Notice the use of the spread operator (`...`). This ensures that the state is not mutated directly. Instead, a new state is created every time there's a change.
2. **Centralized Logic**: All state-modifying logic resides within the reducer. This provides a single source of truth and makes debugging easier.
3. **Consistent Structure**: Using a predefined structure for the action (with a `type` and `payload`) ensures that the state updates are consistent and predictable.

Learning to implement and effectively use reducers in React has greatly enhanced my understanding of state management and its pivotal role in building scalable and maintainable applications.

## 🛠️ Built With

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)

## 🔗 Live Demo

Check out the live demo of the application [here](<link_to_your_live_demo>).

---

