import { JSONSchema4 } from 'json-schema';

export function deletePost(id: number) {
	const fetched = fetch('/api/deletepost/' + id, {
		method: 'DELETE'
	});
	console.log(fetched);
}

export function submitPost(title: string, author: string, text: string	) {
	const post: JSONSchema4 = {
		title: title,
		author: author,
		text: text
	}
	const fetched = fetch('/api/newpost', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	});
	console.log(fetched);
}

export	function getPosts(setFunction: Function, params: string) {
	const fetched = fetch('/api/posts' + params).then((res) => {
		if (res.status === 200)
			return res.json()
		return null;
	});
	console.log(fetched);
	if (fetched)
		fetched.then((p) => setFunction(p));
	else
		setFunction(null);
}
