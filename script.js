(function(){
  var DESIGN_WIDTH = 1440;
  var wrap = document.getElementById("scale-wrap");
  var page = wrap ? wrap.querySelector(".page") : null;
  function applyScale(){
    if(!wrap||!page) return;
    var vw = window.innerWidth;
    if(vw < 900){ wrap.style.transform="none"; wrap.style.height="auto"; document.body.style.minHeight=""; return; }
    var scale = vw < DESIGN_WIDTH ? vw/DESIGN_WIDTH : 1;
    wrap.style.transform = "scale("+scale+")";
    var h = page.offsetHeight;
    document.body.style.minHeight = (h*scale)+"px";
    wrap.style.height = h+"px";
  }
  window.addEventListener("resize", applyScale);
  window.addEventListener("load", applyScale);
  applyScale();

  var form = document.getElementById("newsletter-form");
  if(form){
    var emailInput = document.getElementById("nl-email");
    var emailWrap = document.getElementById("nl-email-wrap");
    var err = document.getElementById("nl-error");
    var success = document.getElementById("nl-success");
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var valid = EMAIL_RE.test(emailInput.value.trim());
      emailWrap.classList.toggle("field-invalid", !valid);
      err.classList.toggle("visible", !valid);
      success.classList.toggle("visible", valid);
      if(valid){
        setTimeout(function(){
          form.reset();
          success.classList.remove("visible");
        }, 2500);
      }
    });
    emailInput.addEventListener("input", function(){
      if(emailWrap.classList.contains("field-invalid")){
        emailWrap.classList.remove("field-invalid");
        err.classList.remove("visible");
      }
    });
  }
})();
