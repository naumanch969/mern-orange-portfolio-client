import React from 'react'

const Hover = () => {

  let text = document.querySelectorAll('ul li a').forEach(text => {
    text.innerHTML = text.innerText
      .split('')
      .map((letters, index) =>
        `<span style={{transition-delay:${index * 40 + 'ms'}}} >${letters}</span>`
      ).join('')
  })

  let cursor = document.querySelector('#cursor')
  document.addEventListener('mousemove', (e) => {
    if (cursor) {
      cursor.style.top = e.pageY + 'px'
      cursor.style.left = e.pageX + 'px'
    }
  })




  return (
    <>
      <div id="cursor"></div>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Creative Menu Hover Effect</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Projects</a></li>
      </ul>
    </>
  )
}

export default Hover