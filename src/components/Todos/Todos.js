import React, { useContext, useReducer, useState } from "react";
import { ProfileContext } from "../../providers/ProfileProvider";
import { generateRandomTodos } from "../../utils/utils";
import styles from "./Todos.module.css";

const Todos = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, dispatch] = useReducer(todosReducer, generateRandomTodos(500));
  const { currentUser } = useContext(ProfileContext);

  const onAddNewTodo = (e) => {
    e.preventDefault();
    dispatch({
      type: "add",
      // For this demo, we'll use the current timestamp as the id. In a production application, you would use a ID generator to ensure uniqueness.
      id: Date.now().toString(),
      text: newTodoText,
      user: currentUser,
    });

    setNewTodoText("");
  };

  return (
    <div className={styles.container}>
      <section className={styles.newTodoSection}>
        <form onSubmit={onAddNewTodo}>
          <label htmlFor="newTodo">
            <input
              type="text"
              name="newTodo"
              id="newTodo"
              value={newTodoText}
              onChange={(e) => {
                setNewTodoText(e.target.value);
              }}
              placeholder="What do you have to do today?"
            />
          </label>
        </form>
        <button
          onClick={() => {
            dispatch({
              type: "add-error-todo",
              user: currentUser,
            });
          }}
        >
          Add Error Todo
        </button>
      </section>
      <ol className={styles.list}>
        {todos.map((todo) => {
          return (
            <li className={styles.todo} key={todo.id}>
              <section className={styles.author}>
                <span
                  title={todo.user.name}
                  aria-label={`Created by ${todo.user.name}`}
                >
                  <div>{todo.user.icon}</div>
                  <div>{todo.user.name}</div>
                </span>
              </section>
              <span>{todo.text.toLowerCase()}</span>

              <div className={styles.actionsContainer}>
                <button
                  aria-label={todo.done ? "Mark as todo" : "Mark as done"}
                  onClick={() => {
                    dispatch({
                      type: "update",
                      todo: {
                        ...todo,
                        done: !todo.done,
                      },
                    });
                  }}
                >
                  {todo.done ? "✅" : "⚪️"}
                </button>
                <button
                  aria-label="Delete task"
                  onClick={() => {
                    dispatch({
                      type: "delete",
                      id: todo.id,
                    });
                  }}
                >
                  🗑
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Todos;

const todosReducer = (todos, action) => {
  switch (action.type) {
    case "add": {
      return [
        ...todos,
        {
          id: action.id,
          text: action.text,
          done: false,
          user: action.user,
        },
      ];
    }
    // This action is just for demo purposes. Dispatching this action will cause an error to be thrown. The Error Boundary should then appear.
    case "add-error-todo": {
      return [
        ...todos,
        {
          id: "bad-todo",
          text: undefined,
          done: false,
          user: action.user,
        },
      ];
    }
    case "update": {
      return todos.map((t) => {
        if (t.id === action.todo.id) {
          return action.todo;
        } else {
          return t;
        }
      });
    }
    case "delete": {
      return todos.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
