import React from 'react';
import { JSONSchema4 } from 'json-schema';
import { submitPost, deletePost, getPosts } from './API';
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

function MakePostBox() {
	const [author, setAuthor] = React.useState('');
	const [text, setText] = React.useState('');
	const submitHandle = (event: any) => {
		event.preventDefault();
		submitPost(author, text);
		setAuthor("");
		setText("");
	}
	return (
<form onSubmit={submitHandle}>
	<label>
		<h3>Author</h3>
		<input type='text' id='author' name='author'
			onChange={(a) => setAuthor(a.target.value)}></input>
	</label><br/>
	<label>
		<h3>Text</h3>
		<textarea id='text' name='text' rows={8} cols={40}
			onChange={(t) => setText(t.target.value)}></textarea>
	</label><br/>
	<button type='submit'>Submit</button>
</form>
	);
}

function Posts() {
	const [postData, setPostData] = React.useState(new Array<JSONSchema4>());
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
	return (
<>
<MakePostBox />
<br/><br/>
<Posts />
</>
	);
}

export default App;
