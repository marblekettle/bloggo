import React from 'react';
import { submitPost, deletePost, getPosts } from './API';
import { ButtonBar } from './Buttons';
import './App.css';

interface PostProps {
	id: number;
	author: string;
	text: string;
	date: Date;
}

function Post({props}: React.ComponentProps<any>) {
	const thedate: string = props.date.toDateString()
		+ " | " + props.date.toLocaleTimeString();
	return (
<div className='boxypost'>
<h2>{props.author}</h2>
<h3>Posted on {thedate}</h3>
<p>{props.text}</p>
</div>
	);
}

function SubmitBox({onClick}: React.ComponentProps<any>) {
	const [author, setAuthor] = React.useState('');
	const [text, setText] = React.useState('');
	const submitHandle = (event: any) => {
		event.preventDefault();
		submitPost(author, text);
		setAuthor("");
		setText("");
	}
	const buttons = [{
		text: '❎',
		class: 'tinybutton',
		func: () => {onClick(false)}
	}];
	return (
<div className='boxy'>
	<ButtonBar barStyle='tinybuttonbar' barButtons={buttons}/>
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
		<button className='submitbutton' type='submit'>Submit</button>
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
			text: (p.text.length < 100 ? p.text : p.text.substr(0, 100) + '...'),
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
		class: 'boxybutton-big',
		func: () => {setShowSubmitBox(true);}
	},{
		text: 'Newest Posts',
		class: 'boxybutton',
		func: () => {}
	}];
	return (

<>
<ButtonBar barStyle={'boxy'} barButtons={buttons}/>
{showSubmitBox ? <SubmitBox onClick={setShowSubmitBox} /> : null}
<Posts />
</>
	);
}

export default App;
