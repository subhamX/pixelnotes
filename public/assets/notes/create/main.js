var toolbarOptions = [
	['bold', 'italic', 'underline', 'strike'],        // toggled buttons
	['blockquote', 'code-block'],
	['link'],
	[{ 'header': 1 }, { 'header': 2 }],               // custom button values
	[{ 'list': 'ordered'}, { 'list': 'bullet' }],
	[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
	[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
	[{ 'direction': 'rtl' }],                         // text direction
	[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
	[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
	[{ 'font': [] }],
	[{ 'align': [] }],
];
let editor = document.getElementById('editor');
var options = {
    modules: {
		toolbar: toolbarOptions,
	},
	placeholder: "Welcome To PixelNotes!",
    theme: 'snow'
  }
var quill = new Quill('#editor', options);
editor.classList.add('disabled');
quill.enable(false);

var contentSet = false;
const rawUrl = 'http://localhost:5001/pixelnotes/us-central1/api/'



function validateID(noteID){
	if(!noteID || noteID.includes(' ')){
		return false;
	}
	return true;
}
document.getElementById('notes-id-form').addEventListener( 'submit', (e) =>{
	e.preventDefault();
	var noteID = document.getElementsByName('id')[0].value;
	if(validateID(noteID)){
		getData(noteID).then( () => {
			editor.classList.remove('disabled');
			console.log("Fetch Complete!");
		});
	}else{
		console.log('Invalid ID')
	}
})

async function getData(id){
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id: parseInt(id)}),
	}
	try{
		const url = rawUrl+'getdata/';
		let response = await fetch(url, options);
		let resJ = await response.json();
		quill.enable();
		// Setting Content To the editor
		quill.setContents(resJ.ops);
		contentSet = true;
	}catch(err){
		console.log(err);
	}
}

// Updating Data...
async function updateData(){
	var noteID = document.getElementsByName('id')[0].value;
	// Send Data To Backend
	var data = quill.getContents();
	data.id=noteID;
	const options = {
		method: 'POST',
		headers: {
			 'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}
	const url = rawUrl+'updatedata/';
	let response = await fetch(url, options);
	let resJ = await response.json();
	// console.log("Updated");
}

setInterval( () => {
	if(contentSet){
		updateData()
	}
}, 5000);