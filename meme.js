// defining variables

const submitButton = document.querySelector('.submit');
const imageInput = document.querySelector('#image');
const topCaption = document.querySelector('#top-text');
const bottomCaption = document.querySelector('#bottom-text');
const memeContainer = document.querySelector('.meme-container');
const meme = document.querySelector('.meme');
const form = document.querySelector('form');
const modal = document.querySelector('.modal');

// check to make sure that picture input is indeed a picture
function checkExtension(url) {
	let extension = url.substr(url.lastIndexOf('.') + 1);
	switch (extension) {
		case 'jpg':
		case 'png':
		case 'gif':
		case 'jpeg':
		case 'svg':
			return true;
	}
}

//fuction to create the meme element and children, given the three inputs.
function memeMaker(text1, text2, text3) {
	//give an alert if link is not an image
	if (!checkExtension(text1)) {
		alert('YOU MUST ENTER A PROPER IMAGE LINK TO CREATE A MEME');
		return;
	}

	//create meme element
	const meme = document.createElement('meme');
	meme.classList.add('meme');

	//create  image
	const image = document.createElement('img');
	image.setAttribute('src', text1);
	image.style.minWidth = meme.clientWidth;

	// create top caption
	let topCaptionSpan;
	if (text2) {
		if (text2.length <= 25) {
			topCaptionSpan = document.createElement('span');
			topCaptionSpan.innerText = text2;
			topCaptionSpan.classList.add('top-caption');
		} else {
			alert('Its best Keep your captions below 20 caracters');
			return;
		}
	}

	//create bottom caption
	let bottomCaptionSpan;
	if (text3) {
		if (text3.length <= 25) {
			bottomCaptionSpan = document.createElement('span');
			bottomCaptionSpan.innerText = text3;
			bottomCaptionSpan.classList.add('bottom-caption');
		} else {
			alert('Its best Keep your captions below 20 caracters');
			return;
		}
	}

	//create modal for hovering on picture
	const modalSpan = document.createElement('span');
	modalSpan.classList.add('modal');

	//create X button to delete pic
	const closeSpan = document.createElement('span');
	closeSpan.classList.add('close');
	closeSpan.innerText = 'X';

	//append all meme pieces. Only append caption if they exist

	memeContainer.append(meme);
	meme.append(image);
	meme.append(modalSpan);
	meme.append(closeSpan);

	if (text2) {
		meme.append(topCaptionSpan);
	}
	if (text3) {
		meme.append(bottomCaptionSpan);
	}

	return meme;
}

//event listener for when user submits the form. meme visual will appear
form.addEventListener('submit', function(event) {
	//make sure there is content in image link input
	if (imageInput.value.length < 1) return;
	event.preventDefault();

	//create new meme with the user input and reset the page
	const newMeme = memeMaker(imageInput.value, topCaption.value, bottomCaption.value);

	if (!newMeme) {
		return;
	}
	form.reset();

	//define modal and X out buttons

	const modalChild = newMeme.querySelector('.modal');
	const closeChild = newMeme.querySelector('.close');

	//show the modal and X button when user mouses over the meme
	newMeme.addEventListener('mousemove', function(e) {
		modalChild.classList.add('show');
		closeChild.classList.add('show');
	});

	//remove the modal and X button when  mouse leaves the meme
	newMeme.addEventListener('mouseleave', function(e) {
		modalChild.classList.remove('show');
		closeChild.classList.remove('show');
	});

	//remove the meme upon clicking the X

	closeChild.addEventListener('click', function(e) {
		console.log(e);
		e.target.parentElement.remove();
		console.log('i clicked');
	});
});
