// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-7722718-13', 'auto');
ga('send', 'pageview');

function enc(o) {
    return o == null ? null : typeof o == 'string'
        ? o.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&#34;')
        : `${o}`
}

function copy(e) {
    e.classList.add('copying')
    let $el = document.createElement("textarea")
    let text = (e.querySelector('code') || e.querySelector('p')).innerHTML
    $el.innerHTML = text
    document.body.appendChild($el)
    $el.select()
    document.execCommand("copy")
    document.body.removeChild($el)
    setTimeout(() => e.classList.remove('copying'), 3000)
}

function onload() {
    removeDuplicates()
    processInstructions()
}

function removeDuplicates() {
    let els = Array.from(document.querySelectorAll('[data-id]'))
    new Set(els.map(x => x.attributes['data-id'].value)).forEach(id => {
        let copies = els.filter(el => el.attributes['data-id'].value == id)
        copies.slice(1).forEach(el => {
            console.log(`removing duplicate ${id}`)
            el.remove()            
        })
    })
}

function processInstructions() {
    let hideEls = Array.from(document.querySelectorAll('[data-hide]'))
    hideEls.forEach(el => {
        let hideSel = el.attributes['data-hide'].value
        document.querySelectorAll(hideSel).forEach(el => {
            el.classList.add('hidden')
        })
    })
}

document.addEventListener('DOMContentLoaded', onload, false)
window.addEventListener('load', onload, false)