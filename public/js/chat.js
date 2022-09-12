const socket = io()

//Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationBUtton = document.querySelector('#send-location')

socket.on('message', (message) => {
    console.log(message)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')
    //disable

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        //enable
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

       if (error) {
         return console.log(error)
       }
       console.log('The message was delivered!')
    })
})

$sendLocationBUtton.addEventListener('click', () =>{
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    $sendLocationBUtton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationBUtton.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })
})