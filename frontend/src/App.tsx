import React from 'react';
import { submitPost, deletePost, getPosts } from './API';
import { MenuBar } from './MenuBar';
import './App.css';

interface PostProps {
	id: number;
	author: string;
	text: string;
	date: Date;
}

function Box({text, clicked}: React.ComponentProps<any>) {
	return(
<button className='clickbox' onClick={clicked}>{text}</button>
	);
}

function DeleteBox({clicked}: React.ComponentProps<any>) {
	const [conf, setConf] = React.useState(false);
	if (!conf) {
		return (
<Box text={'🗑️'} clicked={() => setConf(true)} />
		);
	} else {
		return (
<>
<Box text={'✅'} clicked={() => {clicked(); setConf(false);}}/>
<Box text={'❎'} clicked={() => setConf(false)}/>
</>
		);
	}
}

function Post({props}: React.ComponentProps<any>) {
	const thedate: string = props.date.toDateString()
		+ " | " + props.date.toLocaleTimeString();
	return (
<>
<h2>{props.author}<DeleteBox clicked={() => deletePost(props.id)}/></h2>
<h3>Posted on {thedate}</h3>
<p>{props.text}</p>
</>
	);
}

function SubmitBox() {
	const [author, setAuthor] = React.useState('');
	const [text, setText] = React.useState('');
	const submitHandle = (event: any) => {
		event.preventDefault();
		submitPost(author, text);
		setAuthor("");
		setText("");
	}
	return (
<div className='boxy'>
	<form onSubmit={submitHandle}>
		<label>
			<h3>Author</h3>
			<input type='text' id='author' name='author'
				onChange={(a) => setAuthor(a.target.value)}></input>
		</label>
		<label>
			<h3>Text</h3>
			<textarea id='text' name='text' rows={8} cols={40}
				onChange={(t) => setText(t.target.value)}></textarea>
		</label>
		<button type='submit'>Submit</button>
	</form>
</div>
	);
}

function Posts() {
	const [postData, setPostData] = React.useState(new Array<Object>());
	React.useEffect(() => getPosts(setPostData), []);
	if (!postData)
		return(
<div className='error'>Loading posts...</div>
		);
	if (postData.length === 0)
		return (
<div className='error'>No posts.</div>
		)
	else {
	const posts = postData.map((p: any, i: number) => {
		const pprops: PostProps = {
			id: p.id,
			author: p.author,
			text: p.text,
			date: new Date(p.date)
		}
		return (
<Post key={i} props={pprops}/>
		);
	});
	return (
<div className='postbox'>{posts}</div>
	); }
}

function App() {
/*	return (
<>
<SubmitBox />
<br/><br/>
<Posts />
</>
	);*/
	const [showSubmitBox, setShowSubmitBox] = React.useState(false);
	const buttons = [{
		text: "Make a New Post!",
		func: () => {setShowSubmitBox(true);}
	},{
		text: 'Newest Posts',
		func: () => {}
	}];
	return (

<>
<MenuBar barButtons={buttons}/>
{showSubmitBox ? <SubmitBox /> : null}
</>
	);
}

export default App;
