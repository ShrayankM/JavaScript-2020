'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
	btn.addEventListener('click', openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});


const btnScroll = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');

btnScroll.addEventListener('click', function () {
	console.log(btnScroll.getBoundingClientRect());
	const sectionCoords = sectionOne.getBoundingClientRect();
	console.log(sectionOne.getBoundingClientRect());

	console.log(`Current Scroll (x/y) ${window.pageXOffset} ${window.pageYOffset}`);

	console.log(`Current Viewport (height/width) ${document.documentElement.clientHeight}/${document.documentElement.clientWidth}`)

	// window.scrollTo(sectionCoords.left, sectionCoords.top + window.pageYOffset);

	// window.scrollTo({
	// 	left: sectionCoords.left,
	// 	top: sectionCoords.top + window.pageYOffset,
	// 	behavior: 'smooth',
	// });

	sectionOne.scrollIntoView({ behavior: 'smooth' });
});

// const navLinks = document.querySelectorAll('.nav__link');
// navLinks.forEach(function(link) {
// 	link.addEventListener('click', function(event) {
// 		event.preventDefault();

// 		// console.log(this.getAttribute('href'));
// 		const section = this.getAttribute('href');
// 		console.log(section);
// 		document.querySelector(section).scrollIntoView({behavior: 'smooth'});
// 	})
// })

//* Page Navigation (using Event Delegation)

const navLinkParent = document.querySelector('.nav__links');
navLinkParent.addEventListener('click', function (event) {
	// console.log(event.target, event.currentTarget);
	event.preventDefault();

	if (event.target.classList.contains('nav__link')) {
		const section = event.target.getAttribute('href');
		document.querySelector(section).scrollIntoView({ behavior: 'smooth' });
	}
});


//* Tabbed Component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(function(tab) {
// 	tab.addEventListener('click', function() {
// 		console.log("Tab");
// 	})
// })

tabsContainer.addEventListener('click', function (event) {

	const clicked = event.target.closest('.operations__tab');
	// console.log(clicked);

	if (!clicked) return;
	tabs.forEach(t => t.classList.remove('operations__tab--active'));
	clicked.classList.add('operations__tab--active');

	const n = clicked.getAttribute('data-tab');
	tabsContent.forEach(tab => tab.classList.remove('operations__content--active'));
	document.querySelector(`.operations__content--${n}`).classList.add('operations__content--active');
	// if (event.target.classList.contains('btn') && event.target.classList.contains('operations__tab')) {

	// 	// console.log(event.target);
	// 	// console.log(event.target.getAttribute('data-tab'));
	// 	const currentActive = document.querySelector('.operations__content--active');
	// 	const n = event.target.getAttribute('data-tab');

	// 	const currentBtn = document.querySelector('.operations__tab--active');
	// 	currentBtn.classList.remove('operations__tab--active');
	// 	document.querySelector(`.operations__tab--${n}`).classList.add('operations__tab--active');

	// 	currentActive.classList.remove('operations__content--active');

	// 	document.querySelector(`.operations__content--${n}`).classList.add('operations__content--active');

	// }
})


//* Fadded Navigation Bar
const navLinks = document.querySelector('.nav__links');

const handleHover = function(event) {
	if (event.target.classList.contains('nav__link')) console.log(event.target, this);
	if (event.target.classList.contains('nav__link')) {

		const opacity = this;
		const parent = event.target.closest('.nav');
		const links = parent.querySelectorAll('.nav__link');
		const logo = parent.querySelector('img');

		links.forEach(function(link) {
			if (event.target !== link) link.style.opacity = opacity;
		})
		logo.style.opacity = opacity;
	}
}

navLinks.addEventListener('mouseover', handleHover.bind(0.5));
navLinks.addEventListener('mouseout', handleHover.bind(1));


//* Sticky Navigation

// const nav = document.querySelector('.nav');
// window.addEventListener('scroll', function() {
// 	if (window.scrollY - 500 > sectionOne.getBoundingClientRect().top) 
// 		nav.classList.add('sticky');
// 	else                                                      
// 		nav.classList.remove('sticky');
// })

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

const stickyNav = function(entries, observer) {
	const [entry] = entries;
	if (!entry.isIntersecting) {
		nav.classList.add('sticky');
	}
	else {
		nav.classList.remove('sticky');
	}
}
const observer = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
observer.observe(header);


//* Revel Sections
const sections = document.querySelectorAll('.section');
const sectionRevel = function(entries, observer) {
	const [entry] = entries;

	if (!entry.isIntersecting) return ;
	entry.target.classList.remove('section--hidden');
	observer.unobserve(entry.target);
}

const obsSection = new IntersectionObserver(sectionRevel, {
	root: null,
	threshold: 0.15,
});

sections.forEach(function (section) {
	obsSection.observe(section);
	section.classList.add('section--hidden');
})

//* Lazy Loading Images

const lazyImages = document.querySelectorAll('img[data-src]');

const loadImages = function(entries, observer) {
	const [entry] = entries;
	// console.log(entry);

	if (!entry.isIntersecting) return;
	entry.target.setAttribute('src', entry.target.getAttribute('data-src'));
	// entry.target.classList.remove('lazy-img');

	entry.target.addEventListener('load', function() {
		this.classList.remove('lazy-img');
	})
	observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImages, {
	root: null,
	threshold: 0,
	rootMargin: '200px',
});

lazyImages.forEach(function (img) {
	imgObserver.observe(img);
})


//! Lectures

/*
//* Selecting Elements

console.log(document);
console.log(document.documentElement);
console.log(document.body);

const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));


//* Creating Elements
//Todo creating manually by addingn classes
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = `We use cookies in our website. <button class = "btn btn--close-cookie"> OK!!! </button>`;
header.append(message);

//Todo Creating and Adding using in insertAdjacentHTML
// const message = `<div class = "cookie-message">We use cookies in our website. <button class = "btn btn--close-cookie"> OK!!! </button></div>`;

// header.insertAdjacentHTML('beforeend', message);

const btnClose = document.querySelector('.btn--close-cookie');
btnClose.addEventListener('click', function () {
	// message.remove();
	// document.querySelector('.cookie-message').remove();

	//* Traversing Parent
	const message = document.querySelector('.cookie-message');
	message.parentElement.removeChild(message);
})

//* Styles
message.style.backgroundColor = '#37383d';
console.log(getComputedStyle(message).color);
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');
// document.body.style.setProperty('background-color', 'blue');

const sectionOne = document.querySelector('.section');

// sectionOne.style.setProperty('border-top', '10px solid green');

//* Attributes
const logo = document.querySelector('.nav__logo');

console.log(logo.getAttribute('src'));
// logo.setAttribute('designer', 'Jonas');

console.log(logo.dataset.versionNumber);


//* Events

const h1 = document.querySelector('h1');

// h1.addEventListener('mouseover', function(e) {
// 	alert('MouseOver (addEventListener) h1 Element, :)');
// });

// h1.onmouseover = function(e) {
// 	alert('MouseOver (onmouseover) h1 Element, :)');
// }


const alertHOne = function() {
	alert('MouseOver appears only once ??');

	h1.removeEventListener('mouseover', alertHOne);
}

h1.addEventListener('mouseover', alertHOne);



//* Event Bubbling

const randomInt = function(min, max) {
	return Math.trunc(Math.random() * (max + 1 - min) + min);
}

const randomColor = function() {
	const max = 255, min = 0;
	return `rgb(${randomInt(min, max)}, ${randomInt(min, max)}, ${randomInt(min, max)})`;
}

document.querySelector('.nav__link').addEventListener('click', function(event) {
	this.style.backgroundColor = randomColor();
	// console.log('LINK', event.target, event.currentTarget);

	event.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function(event) {
	this.style.backgroundColor = randomColor();
	// console.log('CONTAINER', event.target, event.currentTarget);

	event.stopPropagation();
})

document.querySelector('.nav').addEventListener('click', function(event) {
	this.style.backgroundColor = randomColor();
	// console.log('NAV', event.target, event.currentTarget);

	event.stopPropagation();
})



//* DOM Traversing

const h1 = document.querySelector('h1');

//todo going downwards (children elements)
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = '#000000';
h1.lastElementChild.style.color = '#ffffff';

//todo going upwards (parent elements)
console.log(h1.parentElement);
console.log(h1.parentNode);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

//todo goind sideways (siblings)
console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling);

[...h1.parentElement.children].forEach(function(element) {
	if (element !== h1) {
		element.style.transform = 'scale(0.5)';
	}
})

*/
