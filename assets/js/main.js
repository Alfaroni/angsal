// Toggle
const toggleOpen = document.querySelectorAll("[data-toggle]");
const toggleClose = document.querySelectorAll("[data-toggle-close]");
if(toggleOpen){
    toggleOpen.forEach(function (item, i) {
        item.addEventListener('click', function(e) {
            this.classList.toggle('is-active');
            const attr = this.getAttribute('data-toggle');
            if(this.classList.contains('is-active')){
                document.body.classList.add('overflow-hidden');
                document.querySelector('[data-toggle-open="'+ attr +'"]').classList.add('open');
            }else{
                document.body.classList.remove('overflow-hidden');
                document.querySelector('[data-toggle-open="'+ attr +'"]').classList.remove('open');
            }
            e.preventDefault();
        });
    });
    
    toggleClose.forEach(function (t, i) {
        t.addEventListener('click', function(e) {
            document.body.classList.remove('overflow-hidden');
            document.querySelector('[data-toggle].is-active')?.classList.remove('is-active');
            document.querySelector('[data-toggle-open].open')?.classList.remove('open');
            e.preventDefault();
        });
    });

}

// Observe
const scrollRoot = document.querySelector('[data-scroller]')
const sections = document.querySelectorAll('[data-section]');
const menuItems = document.querySelectorAll('[data-section-menu]');
let options = {
    root: scrollRoot,
    rootMargin: "-12% 0px -88% 0px"
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const section = entry.target.dataset.section;
            const menuItem = document.querySelector("[data-section-menu="+ section +"]");

            document.body.setAttribute('data-theme', section)
            if(menuItem) {
                menuItems.forEach((item) => {
                    item.parentNode.classList.remove('is-active');
                });
                menuItem.parentNode.classList.add('is-active');
            }
            entry.target.classList.add('is-visible')

        }else{
            entry.target.classList.remove('is-visible')
        }
    });
}, options);
sections.forEach((section) => {
    observer.observe(section);
});
menuItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        const target = document.querySelector("section[data-section="+ item.getAttribute('data-section-menu') +"]");
        target.scrollIntoView({ behavior: 'smooth' });
        document.body.classList.remove('overflow-hidden');
        document.querySelector('[data-toggle].is-active')?.classList.remove('is-active');
        document.querySelector('[data-toggle-open].open')?.classList.remove('open');
        e.preventDefault();
    });
});

//fancybox
Fancybox.bind("[data-fancybox]");

//animejs
var textWrapper = document.querySelectorAll('.animejs');
textWrapper.forEach(function(text){
    text.innerHTML = text.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime.timeline({
        loop: false
    }).add({
        targets: '.animejs .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 1000,
        delay: (el, i) => 20 * (i+1)
    })
})

scrollRoot.addEventListener('scroll', function(){localStorage.setItem("scrollY", scrollRoot.scrollTop);})
if(localStorage.getItem("scrollY")) {
    scrollRoot.scrollTo({ top: parseInt(localStorage.getItem("scrollY")), left: 0, behavior: "instant",});
}