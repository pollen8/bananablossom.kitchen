import FontFaceObserver from 'fontfaceobserver';

const Fonts = () => {

  const fonts = [
    { name: 'Changa', href: 'https://fonts.googleapis.com/css?family=Changa' },
    { name: 'Comfortaa', href: 'https://fonts.googleapis.com/css?family=Comfortaa' },
  ];
  fonts.forEach((font) => {


    const link = document.createElement('link')
    link.href = font.href;
    link.rel = 'stylesheet'

    document.head.appendChild(link)

    const changa = new FontFaceObserver(font.name)

    changa.load().then(() => {
      document.documentElement.classList.add(font.name)
    })
  })
}

export default Fonts