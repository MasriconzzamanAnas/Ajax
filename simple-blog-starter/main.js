// Modal functions
function openModal(postId) {
    const modal = document.getElementById('postModal');
    if (modal) {
        document.body.classList.add('modal-open');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
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



fetch(
    "https://basic-blog.teamrabbil.com/api/post-categories"
).then(response=>response.json())
.then(data =>{
    const catbutton= document.getElementById("catbutton");
    data.forEach(el => {
        catbutton.innerHTML +=(`<button class="px-4 py-2 rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-200 transition-all text-sm sm:text-base whitespace-nowrap">${el.name}</button>`)
    });
})