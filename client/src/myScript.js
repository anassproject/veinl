window.addEventListener('load', ()=>{
	let width = window.innerWidth
	if(width <= 415){
		const burgerBtn = document.querySelector('.burger-btn')
		const menuList = document.querySelector('.menu-cont')
		const smIcons = document.querySelector('.sm-icons')
		let mobileMenu = document.querySelector('.mobile-menu')
		const close = document.querySelector('.close-menu')
		const cartIcon = document.querySelector('.cart-icon')
		mobileMenu.appendChild(menuList)
		mobileMenu.appendChild(smIcons)
		menuList.style.display = "block"
		smIcons.style.display = "block"
		// show menu
		burgerBtn.addEventListener('click', ()=>{
			mobileMenu.style.display = "flex"
			mobileMenu.style.opacity = 1
		})
		// close menu
		close.addEventListener('click', ()=>{
			mobileMenu.style.display = "none"
			mobileMenu.style.opacity = 0
		})
		// close the mobile menu after link clicks (menu, social media icons, and cart icon)
		const links = document.querySelectorAll('.link-type')
		const iconLinks = document.querySelectorAll('.sm-cont i')
		links.forEach(link => {
			link.addEventListener('click', ()=>{
				mobileMenu.style.display = "none"
				mobileMenu.style.opacity = 0
			})
		})
		iconLinks.forEach(link => {
			link.addEventListener('click', ()=>{
				mobileMenu.style.display = "none"
				mobileMenu.style.opacity = 0
			})
		})
		cartIcon.addEventListener('click', ()=>{
			mobileMenu.style.display = "none"
			mobileMenu.style.opacity = 0
		})
	}
})