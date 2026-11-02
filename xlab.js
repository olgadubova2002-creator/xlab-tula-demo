(function(){
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  /* shutter */
  var shot=document.getElementById('shot');
  requestAnimationFrame(function(){requestAnimationFrame(function(){shot.classList.add('open')})});
  /* reveal */
  document.querySelectorAll('.head,.age,.el,.champ,.step,.br,.band,.result .t').forEach(function(n,i){n.classList.add('rv');n.style.transitionDelay=(i%6)*60+'ms'});
  var rv=[].slice.call(document.querySelectorAll('.rv'));
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
    rv.forEach(function(n){io.observe(n)});
  }else rv.forEach(function(n){n.classList.add('in')});
  /* age picker */
  var G={
    baby:{h:'Baby, 4-6 лет',p:'Группа для самых маленьких. Время и филиал подскажем при записи, пробное бесплатно.',sel:'Baby, 4-6 лет',styles:['kids']},
    kids:{h:'Kids, 7-11 лет',p:'Hip-hop как основное направление и базы других уличных стилей. Акробатика с 5 лет.',sel:'Kids, 7-11 лет',styles:['kids','acro']},
    juniors:{h:'Juniors, 12-15 лет',p:'Подростковая группа, те же уличные стили. Подробности назовём при записи.',sel:'Juniors, 12-15 лет',styles:['kids','acro']},
    adults:{h:'Adults, 16+',p:'Jazz-funk, high heels и street dance 25+. Новичкам - с нуля.',sel:'Взрослые 16+',styles:['adults']}
  };
  var ages=[].slice.call(document.querySelectorAll('.age')),els=[].slice.call(document.querySelectorAll('.el'));
  var grp=document.getElementById('grp');
  function wa(t){return 'https://wa.me/79105546245?text='+encodeURIComponent(t)}
  function pick(k){
    var g=G[k];
    ages.forEach(function(a){a.setAttribute('aria-pressed',a.dataset.g===k?'true':'false')});
    els.forEach(function(e,i){
      var tags=e.dataset.s.split(' '),on=g.styles.some(function(s){return tags.indexOf(s)>-1});
      if(k==='baby'&&tags.indexOf('acro')>-1)on=false;
      e.classList.toggle('on',on);e.classList.toggle('off',!on);e.classList.toggle('v',on&&(i%3===1));
    });
    document.getElementById('res-h').textContent=g.h;
    document.getElementById('res-p').textContent=g.p;
    document.getElementById('res-a').setAttribute('href',wa('Здравствуйте! Хочу на бесплатное пробное в X-LAB: '+g.sel+'.'));
    grp.value=g.sel;
  }
  ages.forEach(function(a){a.addEventListener('click',function(){pick(a.dataset.g)})});
  pick('baby');
  /* accordion */
  var steps=[].slice.call(document.querySelectorAll('.step'));
  steps.forEach(function(s){s.addEventListener('click',function(){steps.forEach(function(o){o.setAttribute('aria-expanded',o===s?'true':'false')})})});
  /* form */
  document.getElementById('form').addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('nm').value.trim();
    window.open(wa('Здравствуйте! '+(n?'Меня зовут '+n+'. ':'')+'Хочу на бесплатное пробное в X-LAB: '+grp.value+'.'),'_blank','noopener');
  });
})();
