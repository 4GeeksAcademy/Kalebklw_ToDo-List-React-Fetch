import React, {useState, useEffect} from "react";
import './index.css'


const baseUrl = "https://playground.4geeks.com/todo"

const createUser = () => {
	const options = {
		method: "POST",
		headers: {"content-type":"application/json"},
		body: JSON.stringify({
  			"name": "string",
  			"id": 0
	})
	}

	fetch(baseUrl + "/users/Kaleb", options)
	.then((r) =>r.json())
	.then((d)=> console.log("create-user-data: ", d))
};

const Home = () => {

	

	const [chores, setChores] = useState([])
	const [newChore, setNewChore] = useState({label: ""})
	const updateChoresArray = () =>{
		setChores([...chores, newChore])
		setNewChore("")
	};

	const getToDos = () => {
		console.log("Get To Do Called" )
	fetch(baseUrl + "/users/Kaleb")
	.then((resp)=>{return resp.json()})
	.then((data)=>{setChores(data.todos)
		console.log("get todos data tag: ", data)
	})
	}

const addingChore = (label) => {
	let options = {
		method: "POST",
		headers: {"content-type":"application/json"},
		body: JSON.stringify({
			"label": label,
  			"is_done": false
		})
	}
	fetch(baseUrl + "/todos/Kaleb", options)
	.then((r) =>r.json())
	.then((d)=> {
		getToDos()
		console.log("addingInChore: ", d)})
	
}

const updateToDo = (id) => {
	const options = {
		method: "PUT",
		headers: {"content-type":"application/json"},
		body: JSON.stringify({
			"label": newChore.label,
  			"is_done": true
		})
	}

	fetch(baseUrl + `/todos/${id}`, options)
	.then((response) => response.json())
	.then((data) => {
		getToDos()
		console.log("Updated ToDos: ", data)})
}

const deleteToDo = (todoID) => {
	const options = {
		method: "DELETE",
		headers: {"content-type":"application/json"}
	}
	fetch(baseUrl + "/todos/" + todoID, options)
	.then((response) => response.json())
	.then((data) => {
		getToDos()
		console.log("Deleted ToDos: ", data)})
}

	useEffect(
		() => {
			createUser()
			getToDos()
		},[]
	);
	const deleteChore = (item) => {
		const filteredChores = chores.filter(
			(choreData) => choreData !== item 
		)	
		setChores(filteredChores)
	};

	return (
		<div className="parentDiv container card text-center">
			<h1 className="toDoHeader">To-Do List:</h1>

			<input
			value={newChore.label}
			placeholder="What Do I Need To Do?"
			onChange={(e) => {
				const newTask = e.target.value
				setNewChore({label: newTask, is_done: false})
					}
				}
			onKeyDown = {(e) => {
					if (e.key == "Enter"){
						updateChoresArray(newChore)
						addingChore(newChore.label)
						}
					}
				}
			/>

			<div className="listBody row justify-content-end">

				<div className="listOfChores col">	
					<ul 
					className="ulRoot">
						{chores.map(
						(item, i) => {
							console.log("Mapped Item: ", item)
						return(
							<div className="d-flex">
								<li className="" key={i + "chore"}>{item.label}</li>

									<button 
									type="button"
									className="updateChore btn btn-success"
									onClick={()=>{updateToDo(item.id)}}>
									Update Chore
									</button>

									<button 
									type="button"
									className="deleteChore btn btn-danger"
									onClick = {() => {deleteToDo(item.id)}}
									>Delete Chore
									</button>
							</div>
								)
							}
						)}
					</ul>
				</div>
			</div>		
		</div>
	);
};

export default Home;