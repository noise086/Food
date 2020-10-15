	import {getZero} from './timer';
	
	function slider({container, slide, next, prev, total, current, wrapper, field}) {

		const slids = document.querySelectorAll(slide),
		      prevArrow = document.querySelector(prev),
		      nextArrow = document.querySelector(next),
		      totalSlids = document.querySelector(total),
		      currentSlid = document.querySelector(current),
		      slidesWrapper = document.querySelector(wrapper),
		      slidesField = document.querySelector(field),
		      width = window.getComputedStyle(slidesWrapper).width,
		      carousel = document.querySelector(container);



	let index = 1;
	let offset = 0;

	function setActiveDot () {
		dotsArr.forEach(dot => {
			dot.style.opacity = '.5';
			dotsArr[index-1].style.opacity = '1';
		});
	}
	function delLetter(arg) {
		return +(arg.replace(/\D/g, ''));
	}

	slidesField.style.width = 100 * slids.length +'%';
	slids.forEach (slide => { 
		slide.style.width = width;
	});

	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';
	slidesWrapper.style.overflow = 'hidden';
	currentSlid.innerHTML = `${getZero(index)}`;
	totalSlids.textContent = `${getZero(slids.length)}`;

	const dots = document.createElement('ol');
	carousel.style.position = 'relative';
	carousel.append(dots);
	dots.classList.add('carousel-indicators');
	const dotsArr = [];

	for (let i = 0; i < slids.length; i++) {
		const dot = document.createElement('li');
		dot.classList.add('dot');
		dot.setAttribute('data-slide-to', i+1);
		dots.append(dot);
		dotsArr[i] = dot;
	}
	dotsArr[index-1].style.opacity = '1';

	dots.addEventListener('click', e => {
		const slideTo = e.target.getAttribute('data-slide-to');

		offset = delLetter(width) * (slideTo - 1);
		index = slideTo;
		currentSlid.innerHTML = `${getZero(index)}`;

		slidesField.style.transform = `translateX(-${offset}px)`;
		
		setActiveDot();
	});

	nextArrow.addEventListener('click', () => {
		if (offset == delLetter(width) * (slids.length - 1)) {
			offset = 0;
		} else {
			offset += delLetter(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (index == slids.length) {
			index = 1;
			currentSlid.innerHTML = `${getZero(index)}`;
			
		} else {
			index++;
			currentSlid.innerHTML = `${getZero(index)}`;
		}
		setActiveDot();
	});

	prevArrow.addEventListener('click', () => {
		if (offset == 0) {
			offset = delLetter(width) * (slids.length - 1);
			
		} else {
			offset -= delLetter(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (index == 1) {
			index = slids.length;
			currentSlid.innerHTML = `${getZero(index)}`;
		} else {
			index--;
			currentSlid.innerHTML = `${getZero(index)}`;
		}
		setActiveDot();
	});


	}

	export default slider;