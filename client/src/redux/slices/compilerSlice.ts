import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
  code: {
    html: string;
    css: string;
    javascript: string;
  };

  selectedLanguage: "html" | "css" | "javascript";
}

const initialState: CompilerSliceStateType = {
  code : {
    html: `<html lang="en">
  <body>
    <div class="container">
        <h1>To-Do List</h1>
        <div class="input-container">
            <input type="text" id="taskInput" placeholder="Add a new task...">
            <button onclick="addTask()">Add Task</button>
        </div>
        <ul id="taskList"></ul>
    </div>

    <script src="script.js"></script>
  </body>
</html>`,
  css:`body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
}

h1 {
    text-align: center;
    color: #333;
}

.input-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

input {
    width: 70%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
}

button {
    width: 25%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    background-color: #f9f9f9;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li span {
    flex-grow: 1;
}

li button {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
}

li button:hover {
    background-color: #c82333;
}`,
  javascript: `function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== "") {
        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskInput.value;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            taskList.removeChild(li);
        };

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = ''; // Clear the input field
    }
}`,
  },
  selectedLanguage: "html",
};
const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateSelectedLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType["selectedLanguage"]>
    ) => {
      state.selectedLanguage = action.payload;
    },
    updateCode : (state,action : PayloadAction<string>) => {
      state.code[state.selectedLanguage] = action.payload;
    },
    updateCodeBody : (state, action: PayloadAction<CompilerSliceStateType["code"]>) => {
      state.code = action.payload
    }
  },
});

export default compilerSlice.reducer;
export const {
  updateSelectedLanguage,
  updateCode,
  updateCodeBody
} = compilerSlice.actions;
