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

	fetch(baseUrl + "/users/Kalebklw", options)
	.then((r) =>r.json())
	.then((d)=> console.log("create-user-data: ", d))
};

const getAllUsers = () => {
	fetch(baseUrl + "/users")
			.then(
				(resp) => {
					console.log("response: ", resp)
					return resp.json()
				}
			)
			.then(
				(data) => {console.log("dataUsers: ", data)
				}
			)
}

const getToDos = () => {
	fetch(baseUrl + "/users/Kalebklw")
	.then((resp)=>{return resp.json()})
	.then((data)=>{console.log("dataToDo: ", data)})
}

const addingChore = () => {
	let options = {
		method: "POST",
		headers: {"content-type":"application/json"},
		body: JSON.stringify({
			"label": "wash clothes",
  			"is_done": false
		})
	}
	fetch(baseUrl + "/todos/Kalebklw", options)
	.then((r) =>r.json())
	.then((d)=> console.log("addingInChore: ", d))
}

const Home = () => {

	useEffect(
		() => {
			addingChore()
			getToDos()
			createUser()
		},[]
	);

	const [chores, setChores] = useState(["Vacuum", "Wash Dishes", "Dust", "Make Bed"])
	const [newChore, setNewChore] = useState("")
	const nextChore = () =>{
		setChores([...chores, newChore])
		setNewChore("")
	};

	const deleteChore = (item) => {
		const filteredChores = chores.filter(
			(choreData) => choreData != item 
		)
		console.log("dust: ", filteredChores)	
		setChores(filteredChores)
	};

	return (
		<div className="parentDiv container card text-center">
			<h1 className="toDoHeader">To-Do List:</h1>

			<input
			value={newChore}
			placeholder="What Do I Need To Do?"
			onChange={(e) => {
				const newTask = e.target.value
				setNewChore(newTask)
					}
				}
			onKeyDown = {(e) => {
					if (e.key == "Enter"){
						nextChore(newChore)
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
						return(
							<div className="d-flex">
								<li className="" key={i + "chore"}>{item}</li>
								<span className="deleteChore"
								onClick = {() => {
									deleteChore(item)
										}
									}
								>X</span>
							</div>
								)
							}
						)}
					</ul>
				</div>

				<div className="choreButton col-4">
					<button onClick={() => nextChore()}>
						Add Chore
					</button>
					<button onClick={() => addingChore()}>
						Add Chore To API
					</button>
				</div>
			</div>		
		</div>

		
	);
};

export default Home;