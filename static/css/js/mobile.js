/* ══ MOBILE MENU ══ */
function toggleMobileMenu(){
  const menu=document.getElementById('mobileMenu');
  const btn=document.getElementById('hamburger');
  const isOpen=menu.classList.contains('open');
  if(isOpen){closeMobileMenu();}else{
    menu.classList.add('open');
    btn.classList.add('open');
    document.body.style.overflow='hidden';
  }
}
function closeMobileMenu(){
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow='';
}
