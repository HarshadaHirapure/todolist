import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore';

const email = document.getElementById("email");
const password = document.getElementById("password");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const todoInput = document.getElementById("todo-input");
const addTodo = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

signup.onclick = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => alert("Signup successful"))
    .catch(err => alert(err.message));
};

login.onclick = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => alert("Login successful"))
    .catch(err => alert(err.message));
};

logout.onclick = () => {
  signOut(auth).then(() => alert("Logged out"));
};

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("todo-app").style.display = "block";
    logout.style.display = "inline";
    loadTodos(user.uid);
  } else {
    document.getElementById("todo-app").style.display = "none";
    logout.style.display = "none";
    todoList.innerHTML = '';
  }
});

addTodo.onclick = async () => {
  const user = auth.currentUser;
  if (user && todoInput.value.trim()) {
    await addDoc(collection(db, "todos"), {
      uid: user.uid,
      task: todoInput.value,
      createdAt: new Date()
    });
    todoInput.value = '';
  }
};

function loadTodos(uid) {
  const q = query(
    collection(db, "todos"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {
    todoList.innerHTML = '';
    snapshot.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().task;
      todoList.appendChild(li);
    });
  });
}
