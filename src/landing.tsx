//import '../../Css/styles.css';
// React
import React, { useEffect, useReducer } from 'react';
//import { arrayExtensions } from 'mobx/dist/internal';
// import history from "../../Helpers/history";
// import DbList from './DbList';
// import { observer} from 'mobx-react-lite';
//const electron = window.require('electron') 
//const electron = require('electron');
//const { ipcRenderer } = electron;


interface State {
	loading: boolean;
	needFetch: boolean;
	modalMessage: string | null;
	files: string[];
}

function reducer(state: State, action: {type : string, payload : string[]}) {
	const { type, payload } = action;
	switch(type) {
		case 'need-fetch': 
			return {...state, needFetch: true, loading : true};
		case 'do-not-need-fetch':
			return {...state, needFetch: false, loading: false};	
		case 'successful-fetch':
			return {...state, needFetch: false, files: payload, loading: false};		
		default:
			return {...state}
	}
}

  function Landing() {


		const aState : State = {
			loading: true,
			needFetch: true,
			modalMessage: null,
			files: []
		}
	

	const [state, dispatch] = useReducer(reducer, aState);

	const NeedFetch = () => {
		dispatch({type: "need-fetch", payload: []})
	}

	const fetchDBs = async (): Promise<string[]> => {
        console.log("TRYING \n  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ \n")
		try {
			//const files: string[] | [] = await ipcRenderer.invoke('asynchronous-get-DBs');
            const files : string[] | [] = await window.e_Landing.getDbs();
			return files;
		} 

		catch(ex) {
			console.log(ex);
		}
		return [];
		// dispatch({type: 'successful-fetch', payload: files})
	}	
	console.log("render app");

	// object for state
	// useEffect runs everytime it renders
	// useEffect with dependency runs everytime it the dependency changes
	useEffect(() => {
		//  { loading: false, liked }
		let mounted = true;
		if (state.needFetch === true && mounted === true) {

			fetchDBs().then(files => {
				if (mounted) {
					dispatch({type: 'successful-fetch', payload: files});
				}
			})
				
		}
		// only run on mount && when needFetch changes
		//
		return () => {
			mounted = false;
		}
	}, [state.needFetch]);
	
//	  let aNum : Number = files.indexOf('');
	return (
		
		<>
         <p>Hi</p>
         <button onClick={NeedFetch}>Need Fetch</button>
        </>
	)	
}

export default Landing;
//export default observer(Landing);