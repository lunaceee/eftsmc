define("2014/components/slider/Carousel",["$"],function(a){function b(d,c){this.$element=a(d);
this.$indicators=this.$element.find(".indicators");
this.options=c;
this.options.pause=="hover"&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))
}b.prototype={cycle:function(c){if(!c){this.paused=false
}if(this.interval){clearInterval(this.interval)
}this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval));
return this
},getActiveIndex:function(){this.$active=this.$element.find(".item.active");
this.$items=this.$active.parent().children();
return this.$items.index(this.$active)
},to:function(e){var c=this.getActiveIndex(),d=this;
if(e>(this.$items.length-1)||e<0){return
}if(this.sliding){return this.$element.one("slid",function(){d.to(e)
})
}if(c==e){return this.pause().cycle()
}return this.slide(e>c?"next":"prev",a(this.$items[e]))
},pause:function(c){if(!c){this.paused=true
}if(this.$element.find(".next, .prev").length&&a.support.transition.end){this.$element.trigger(a.support.transition.end);
this.cycle(true)
}clearInterval(this.interval);
this.interval=null;
return this
},next:function(){if(this.sliding){return
}return this.slide("next")
},prev:function(){if(this.sliding){return
}return this.slide("prev")
},slide:function(j,d){var l=this.$element.find(".item.active"),c=d||l[j](),i=this.interval,k=j=="next"?"left":"right",f=j=="next"?"first":"last",g=this,h;
this.sliding=true;
i&&this.pause();
c=c.length?c:this.$element.find(".item")[f]();
h=a.Event("slide",{relatedTarget:c[0],direction:k});
if(c.hasClass("active")){return
}if(this.$indicators.length){this.$indicators.find(".active").removeClass("active");
this.$element.one("slid",function(){var e=a(g.$indicators.children()[g.getActiveIndex()]);
e&&e.addClass("active")
})
}if(a.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(h);
if(h.isDefaultPrevented()){return
}c.addClass(j);
c[0].offsetWidth;
l.addClass(k);
c.addClass(k);
this.$element.one(a.support.transition.end,function(){c.removeClass([j,k].join(" ")).addClass("active");
l.removeClass(["active",k].join(" "));
g.sliding=false;
setTimeout(function(){g.$element.trigger("slid")
},0)
})
}else{if(a.support.transition&&this.$element.hasClass("fade")){this.$element.trigger(h);
if(h.isDefaultPrevented()){return
}c.addClass(j);
c[0].offsetWidth;
l.addClass("out");
c.addClass("in");
this.$element.one(a.support.transition.end,function(){c.removeClass([j,"in"].join(" ")).addClass("active");
l.removeClass(["active","out"].join(" "));
g.sliding=false;
setTimeout(function(){g.$element.trigger("slid")
},0)
})
}else{this.$element.trigger(h);
if(h.isDefaultPrevented()){return
}l.removeClass("active");
c.addClass("active");
this.sliding=false;
this.$element.trigger("slid")
}}i&&this.cycle();
return this
}};
return b
});
define("2014/components/slider/Slider",["./Carousel","$","shared/lib/RSVP"],function(h,d,f){var a;
var c="picturefill.refresh";
function g(){var k=this;
var j=this.$el;
var n=this.$el.find(" > .inner > .item");
var l={};
var m=false;
function i(){var o=0;
if(k.options.fixedHeight===false){if(m){return
}m=true;
(function p(){j.height(n.filter(".next,.prev").height()||n.filter(".active").height());
setTimeout(p,150)
})()
}else{n.each(function(q,t){var r=d(t);
r.removeAttr("height").css({height:"",display:"block"});
var s=r.outerHeight();
if(s>o){o=s
}});
n.css({display:""}).height(o)
}}if(a==null){a=f.resolve().then(function(){k._carousel=new h(j,k.options)
}).then(function(){j.on("click","[data-slider-to]",function(q){var o=d(q.target);
var p=o.attr("data-slider-to");
if(p=="next"){k._carousel.next()
}else{if(p=="prev"){k._carousel.prev()
}else{if(p){k._carousel.pause().to(p).cycle()
}}}q.preventDefault()
});
j.on("slider.update",i);
j.on("slider.to",function(o,p){if(o&&o.stopPropagation){o.stopPropagation()
}k.to(p)
})
}).then(function(){n.trigger(c,l)
}).then(function(){return new f.Promise(function(o){if(l.promise==null){o()
}l.promise.then(o,o)
})
}).then(function(){var o=[];
j.find("img").each(function(q,r){if(r.complete){return
}var p=new f.Promise(function(t,s){d(r).on("load",t);
d(r).on("error",s)
});
o.push(p)
});
return f.all(o)
}).then(i,i)
}return a
}function b(j,i){this.$el=j;
this.options=i;
g.call(this)
}var e=b.prototype;
e.cycle=function(){var i=this;
return g.call(i).then(function(){i._carousel.cycle()
})
};
e.pause=function(){var i=this;
return g.call(i).then(function(){i._carousel.pause()
})
};
e.next=function(){var i=this;
return g.call(i).then(function(){i._carousel.next()
})
};
e.prev=function(){var i=this;
return g.call(i).then(function(){i._carousel.prev()
})
};
e.to=function(i){var j=this;
return g.call(j).then(function(){j._carousel.to(i)
})
};
return b
});
define("2014/components/slider/initializer",["$","2014/components/slider/Slider","shared/util/registers/ActionProvider","shared/util/dom/observer/remove"],function(d,c,b,a){return{init:function(h,f){var g=f&&f.paused;
var i=new c(h,{interval:f.interval,pause:"hover",fixedHeight:f.fixedHeight===true});
var e=b.instance;
var j={id:h.attr("id"),$el:h,type:"slider",actions:{"next slide":function(){i.next()
},"previous slide":function(){i.prev()
},"go to":function(k){i.to(k)
},}};
e.register(j);
a(h.parent()[0]).then(function(){e.unregister(j)
});
d(function(){if(g!==true){i.cycle()
}})
}}
});