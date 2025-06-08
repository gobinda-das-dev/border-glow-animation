const parent = document.querySelector('.parent');
const mask = parent.querySelector('.mask-gradient');

const tw = gsap.to(mask, {
   '--p1': '-80%',
   '--p2': '0%',
   duration: 0.3,
   ease: 'power1.inOut',
   paused: true,
});

parent.addEventListener('mouseenter', () => tw.play());
parent.addEventListener('mouseleave', () => tw.reverse());





const respectedBound = 200; // check for mouse movement around this value
const position = { x: 0, y: 0 };
const size = { width: 0, height: 0 };
const mouse = { x: 0, y: 0 };
let getOpacity;

const setRotate = gsap.quickSetter(mask, '--angle', 'rad');
const setOpacity = gsap.quickSetter(mask, 'opacity');

const calculatePosition = () => {
   const { x, y, width, height } = mask.getBoundingClientRect();
   position.x = x + width / 2;
   position.y = y + height / 2;
   size.width = width;
   size.height = height; console.log(y);

   getOpacity = gsap.utils.pipe(
      gsap.utils.mapRange(0, 1, 1 + width / respectedBound, 0),
      gsap.utils.clamp(0, 1)
   );
}

const updateMousePosition = (e) => {
   mouse.x = e.clientX;
   mouse.y = e.clientY;
   const distance = Math.sqrt((mouse.x - position.x) ** 2 + (mouse.y - position.y) ** 2);
   if (distance > (respectedBound + size.width)) return;

   const angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);
   const normalizedDistance = distance / respectedBound;

   const opacity = getOpacity(normalizedDistance);

   setRotate(angle + Math.PI / 2);
   setOpacity(opacity);
}

calculatePosition();
window.addEventListener('resize', calculatePosition);
window.addEventListener('mousemove', updateMousePosition);