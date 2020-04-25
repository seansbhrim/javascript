initiateUpload = () => {
    const files = document.getElementById('input-file').files;
    console.log(files);
    const file = files[0];

    if(file == null){
        console.log('No file.');
    }else{
        getSignedURL(file);
    }

}


getSignedURL = (file) => {
    const xhr = new XMLHttpRequest();
    let resp;

    xhr.open('GET', '/get-signed-url', true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                console.log('Got signed URL...');
                resp = JSON.parse(xhr.response);
                console.log(resp.signedURL);
                //console.log(resp.signedURL);
                uploadFile(file, resp.signedURL);
            }else{
                console.log('Error not 200');
            }
        }
    }

    xhr.send();
}

uploadFile = (file, signed_url) => {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', signed_url);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                console.log('Upload success.');
                //console.log(xhr.response);
            }else{
                console.log('Upload failed.');
            }
        }
    }

    xhr.send(file);
}