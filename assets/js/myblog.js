async function fetchMyPosts(){
    try{
        const response = await fetch('https://api.npoint.io/7c4a7621b42150a948eb');
        if(!response.ok){
            throw new Error(`Server Error: Error Code:${response.status}`);
        }else{
            const data = await response.json();
            const blogContainer = document.getElementById('blogContainer');
            for(i=data.length-1;i>=0;i--){
                var postDiv = document.createElement('div');
                postDiv.classList.add('card','flex-shrink-2','bg-dark','text-light','m-2');
                postDiv.innerHTML = `
                <div class="card-header">${data[i]['title']}</div>
              <div class="card-body"><p class=card-text>${data[i]['content']}</p></div>
              <div class="card-footer">${data[i]['date']}</div>
                `;
                blogContainer.append(postDiv);
            };

        }
    } catch(error){
        console.error('Error fetching data',error);
    }
}

fetchMyPosts();