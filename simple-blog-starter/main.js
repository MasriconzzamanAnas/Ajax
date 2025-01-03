// Modal functions
function openModal(postId) {
    const modal = document.getElementById('postModal');
    if (modal) {
        document.body.classList.add('modal-open');
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        fetch(`https://basic-blog.teamrabbil.com/api/post-details/${postId}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Update modal content
            document.getElementById('postimg').setAttribute("src", data.postDetails.img);
            document.getElementById('postcontent').textContent = data.postDetails.content;
            // document.getElementById('submit').addEventListener('click', function () {
            //     postcomment(data.postDetails.list_id);
            // });
            const commentbox = document.getElementById('commentbox');
            commentbox.innerHTML = ''; // Clear existing comments
            data.postComments.forEach(el =>{
                commentbox.innerHTML += (`
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                                ${el.author[0]}
                            </div>
                            <div>
                                <div class="font-semibold text-gray-800">${el.author}</div>
                                <div class="text-sm text-gray-500">December 15, 2024</div>
                            </div>
                        </div>
                        <p class="text-gray-600 leading-relaxed">${el.comment}</p>
                    </div>
                `);
            })
        });

        
    }
}

function closeModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

// Close modal when clicking outside
document.getElementById('postModal')?.addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// categories list
fetch(
    "https://basic-blog.teamrabbil.com/api/post-categories"
).then(resopnse => resopnse.json())
.then((data) =>{
    const catbutton = document.getElementById("catbutton");
    data.forEach ((el)=>{
        catbutton.innerHTML +=(`<button onclick="calltheid(${el.id})" class="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white hover:shadow-lg hover:shadow-purple-200 transition-all text-sm sm:text-base whitespace-nowrap"> ${el.name} </button>`)
    })
})

// Articale List
fetch(
    "https://basic-blog.teamrabbil.com/api/post-newest"
).then(resopnse => resopnse.json())
.then(data=>{
    const articleList = document.getElementById("articleList")
    articleList.innerHTML =""
    data.forEach(el =>
        articleList.innerHTML += (`
            <article class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                <div class="relative overflow-hidden">
                    <img src="${el.img}" alt="Post Title" class="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300">
                    <div class="absolute top-4 left-4">
                        <span
                            class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-purple-600 text-sm font-semibold">
                            Technology
                        </span>
                    </div>
                </div>
                <div class="p-6">
                    <h3
                        class="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                        ${el.title}
                    </h3>
                    <p class="text-gray-600 mb-4 line-clamp-2">
                        ${el.short}
                    </p>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">Dec 15, 2024</span>
                        <button onclick="openModal(${el.id})"
                            class="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-transition-colors">
                            Read more →
                        </button>
                    </div>
                </div>
            </article>
        `)
    );
    // console.log(data)
})

// search by category
const calltheid = (id=>{
    fetch(
        `https://basic-blog.teamrabbil.com/api/post-list/${id}`
    ).then(response => response.json())
    .then(data =>{
        const articleList = document.getElementById("articleList")
        articleList.innerHTML =""
        data.forEach(el =>
            articleList.innerHTML += (`
                <article class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                    <div class="relative overflow-hidden">
                        <img src="${el.img}" alt="Post Title" class="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300">
                        <div class="absolute top-4 left-4">
                            <span
                                class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-purple-600 text-sm font-semibold">
                                Technology
                            </span>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3
                            class="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                            ${el.title}
                        </h3>
                        <p class="text-gray-600 mb-4 line-clamp-2">
                            ${el.short}
                        </p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-500">Dec 15, 2024</span>
                            <button onclick="openModal(${el.id})"
                                class="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-transition-colors">
                                Read more →
                            </button>
                        </div>
                    </div>
                </article>
            `)
        );
    })
})



// post comment
function postcomment(id) {
    //e.preventDefault();  Prevent default form submission behavior

    const postId = id;
    const author = document.getElementById('authorName').value.trim();
    const comment = document.getElementById('commentText').value.trim();

    if (comment === '') {
        alert('Please enter a comment');
        return;
    }

    fetch(`https://basic-blog.teamrabbil.com/api/create-comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            list_id: postId,
            author: author,
            comment: comment,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })    
        .then(data => {
            alert('Comment posted successfully');
            // Clear the input fields
            document.getElementById('authorName').value = '';
            document.getElementById('commentText').value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to post comment. Please try again.');
        });
}



// document.getElementById('commentForm').addEventListener('submit', function(e){
//     e.preventDefault();
//     const comment = document.getElementById('commentInput').value;
//     const postId = document.getElementById('postId').value;

//     if(comment.trim() === ''){
//         alert('Please enter a comment');
//         return;
//     }

//     fetch('https://basic-blog.teamrabbil.com/api/create-comment', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             postId: postId,
//             comment: comment
//         })
//     })
//    .then(response => response.json())
//    .then(data => {
//         console.log(data);
//         alert('Comment posted successfully');
//         location.reload(); // Reload the page to see the new comment
//     });
// });


