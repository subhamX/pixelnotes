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
	let noteID = document.getElementsByName('id')[0].value;
	if(validateID(noteID)){
		console.log(`[${noteID}]`);
		getData(noteID).then( () => {
			editor.classList.remove('disabled')
		});
	}else{
		console.log('no')
	}
})

const getDataUrl = rawUrl+'getdata/';
async function getData(id){
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id: parseInt(id)}),
	}
	try{
		console.log(getDataUrl);
		let response = await fetch(getDataUrl, options);
		let resJ = await response.text();
		console.log(resJ)
		quill.enable();
		quill.setContents(resJ.ops);
		contentSet = true;
	}catch(err){
		console.log(err)
	}
	// Setting Content To the editor
}


