data = {
    "title": "Hello World!",
    "descrip": "This file was uploaded via aws-sdk putobject method."
}

initiateUpload = () => {
    fetch('/upload-json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then( (res) => {
        if(res.status === 200){
            console.log('Status 200 OK');
            console.log('JSON file successfully uploaded!');
        }else{
            console.log('Error not 200');
        }
    } ).catch( (err) => console.log(`Fetch err: ${err}`) );
}