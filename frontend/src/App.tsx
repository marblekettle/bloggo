import React from 'react';
import { submitPost, deletePost, getPosts } from './API';
import { ButtonBar } from './Buttons';
import './App.css';

interface PostProps {
	id: number;
	title: string;
	author: string;
	text: string;
	date: Date;
}

function SmallPost({clicked, props}: React.ComponentProps<any>) {
	const thedate: string = props.date.toDateString()
		+ " | " + props.date.toLocaleTimeString();
	return (
<div className='boxypost'>
<h2 onClick={() => clicked(props.id)}>{props.title}</h2>
<h3>Posted by {props.author} on {thedate}</h3>
<p>{props.text}</p>
</div>
	);
}

function SinglePost({postId}: React.ComponentProps<any>) {

}

function SubmitBox({onClick}: React.ComponentProps<any>) {
	const [title, setTitle] = React.useState('');
	const [author, setAuthor] = React.useState('');
	const [text, setText] = React.useState('');
	const submitHandle = (event: any) => {
		event.preventDefault();
		submitPost(title, author, text);
		setTitle('');
		setAuthor('');
		setText('');
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
			<h3>Title</h3>
			<input type='text' id='title' name='title'
				onChange={(t) => setTitle(t.target.value)}></input>
		</label>
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

function Posts({clicked}: React.ComponentProps<any>) {
	const [postData, setPostData] = React.useState(new Array<Object>());
	React.useEffect(() => getPosts(setPostData, ''), []);
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
			title: p.title,
			author: p.author,
			text: (p.text.length < 100 ? p.text : p.text.substr(0, 100) + '...'),
			date: new Date(p.date)
		}
		return (
<SmallPost key={i} props={pprops} clicked={clicked}/>
		);
	});
	return (
<div className='postbox'>{posts}</div>
	); }
}

function App() {
	const [showSubmitBox, setShowSubmitBox] = React.useState(false);
	const [showPosts, setShowPosts] = React.useState('newest');
	const [postToShow, setPostToShow] = React.useState(-1);
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
{showPosts == 'newest' ? <Posts clicked={
	(id) => {setShowPosts('single'); setPostToShow(id)}
} /> : null}
{showPosts == 'single' ? <SinglePost postId={postToShow} /> : null}
</>
	);
}

export default App;
