import FontFaceObserver from 'fontfaceobserver';

const Fonts = () => {

  const fonts = [
    { name: 'Changa', href: 'https://fonts.googleapis.com/css?family=Changa&display=swap' },
    { name: 'Comfortaa', href: 'https://fonts.googleapis.com/css?family=Comfortaa&display=swap' },
  ];
  fonts.forEach((font) => {


    const link = document.createElement('link')
    link.href = font.href;
    link.rel = 'stylesheet'

    document.head.appendChild(link)

    const changa = new FontFaceObserver(font.name)

    changa.load(null, 5000).then(() => {
      document.documentElement.classList.add(font.name)
    }, function () {
      console.log(`font ${link} not loaded`);
    })
  })
}

export default Fonts
