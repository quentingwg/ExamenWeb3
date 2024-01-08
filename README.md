# ExamenWeb3

Web 3 exam

Créer un frontend : npm create vite@latest myProjectName -- --template react
Formulaire : <input value={} onChange={handlechange}
Puis le onSubmit du form renvoie ver la methode add qui ajoute a la liste le nouvel element 
	setPersons(persons.concat(newElement)
handleChange permet de modifier la valeur du nouvel element grâce a setNewNote() -> 
const [newNote,setNewNote] = useState(‘’);




Consommer une api : npm install axios
npm install json-server --save-dev
npx json-server --port 3001 --watch db.json
dans le code js : const promise = axios.get(url) ;
promise.then(response => {
    console.log(response.data);
    const persons= response.data;
    ReactDOM.createRoot(document.getElementById('root')).render(<App persons= {persons} />)

    
})

import React, { useContext, useState, useEffect } from 'react';

Lors d’un useEffect ne pas oublier de mettre le ,[]) a la fin afin que le render ne se fasse qu’une fois 
useEffect permet d'éxécuter du code, notamment après le premier "render" du composant dans lequel il est défini.
par défaut, useEffect est exécuté après CHAQUE "render" du composant.
le 2e argument de useEffect permet de "choisir" le moment où il sera exécuté. Mettre "[]" permet de sélectionner, "uniquement après le premier "render".
Language dans l’app : si on doit passer un state dans plusieurs components, utiliser le reacto context qui permet de donner les valeurs et fonctions a un component plus bas sans devoir les passer a chaques components. 



Module 7 : React router 
Ajouter le router react : npm install react-router-dom

import { useNavigate } from "react-router-dom";

pour import navigate(‘/’)

lorsqu’on clique sur une anecdote, récupérer l’id grâce a 
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdote=> anecdote.id === Number(match.params.id)): null


pour creer un formulaire, regarder le line dans les favoris et voir le basic -> <> affiche le code 
 
Le …values permet de ne pas devoir reecrire toutes les valeurs. C’est une copie

antd: https://ant.design/components/form#components-form-demo-basic