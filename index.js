import{a as u,S as m,i as c}from"./assets/vendor-tnUJPedx.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function l(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(e){if(e.ep)return;e.ep=!0;const a=l(e);fetch(e.href,a)}})();const f="48505401-41d9a45057075903c793c7a55",h="https://pixabay.com/api/";async function p(r,n=1,l=15){const o=`${h}?key=${f}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=${l}`;try{const e=await u.get(o);if(e.data.hits.length===0)throw new Error("No images found");return{hits:e.data.hits,totalHits:e.data.totalHits}}catch(e){throw new Error("Failed to fetch images: "+e.message)}}let g;function y(r,n=document.querySelector(".card-list")){const l=r.map(o=>`
      <a href="${o.largeImageURL}" class="gallery-item">
        <img src="${o.webformatURL}" alt="${o.tags}" />
        <div class="info">
          <p><strong>Likes:</strong> ${o.likes}</p>
          <p><strong>Views:</strong> ${o.views}</p>
          <p><strong>Comments:</strong> ${o.comments}</p>
          <p><strong>Downloads:</strong> ${o.downloads}</p>
        </div>
      </a>
    `).join("");n.insertAdjacentHTML("beforeend",l),g?g.refresh():g=new m(".gallery-item",{captions:!0,captionsData:"alt",captionDelay:250})}function P(r=document.querySelector(".card-list")){r.innerHTML=""}const b=document.querySelector(".search-form");document.querySelector(".card-list");const i=document.querySelector(".load-more");i.style.display="none";const s=document.createElement("p");s.textContent="Loading...";s.style.display="none";s.style.fontSize="16px";s.style.fontWeight="bold";s.style.textAlign="center";s.style.marginTop="10px";const t={page:1,perPage:15,q:"",maxPage:0};i.insertAdjacentElement("afterend",s);b.addEventListener("submit",r=>{r.preventDefault();const n=r.target.elements.query.value.trim();if(!n){c.warning({title:"Warning",message:"Please enter a search query!"});return}t.q=n,t.page=1,P(),s.style.display="block",i.style.display="none",p(n,t.page,t.perPage).then(({hits:l,totalHits:o})=>{if(l.length===0){c.error({title:"Error",message:"Sorry, no images found! Please try again."});return}y(l),t.maxPage=Math.ceil(o/t.perPage),t.page<t.maxPage&&(i.style.display="block")}).catch(()=>{c.error({title:"Error",message:"An error occurred while fetching images. Please try again!"})}).finally(()=>{s.style.display="none"})});i.addEventListener("click",()=>{t.page+=1,s.style.display="block",i.style.display="none",p(t.q,t.page,t.perPage).then(({hits:r})=>{if(r.length===0||t.page>=t.maxPage){c.error({title:"Error",message:"No more images available."}),i.style.display="none";return}y(r),w(),t.page<t.maxPage?i.style.display="block":i.style.display="none"}).catch(()=>{c.error({title:"Error",message:"An error occurred while fetching images. Please try again!"})}).finally(()=>{s.style.display="none"})});function w(){const r=document.querySelector(".gallery-item");if(r){const n=r.getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
