import fetch from "isomorphic-fetch";

export function fetchBlogPost(id) {
    return fetch('http://localhost:8000/app_dev.php/posts/' + id, {
        method: 'GET',
        mode: 'CORS'
    }).then(res => res.json())
        .catch(err => err);
}

export function fetchBlogPosts(pageNumber, limit, filter, sort, direction) {
    let p = new URLSearchParams();

    p.append('page', pageNumber || 1);
    p.append('limit', limit || 10);
    p.append('filter', filter || '');
    p.append('sort', sort || '');
    p.append('direction', direction || '');

    console.log('http://api.symfony-3.dev/app_dev.php/posts?', 'http://api.symfony-3.dev/app_dev.php/posts?' + p);

    return fetch('http://localhost:8000/app_dev.php/posts?' + p, {
        method: 'GET',
        mode: 'CORS'
    }).then(res => res.json())
        .catch(err => err);
}

export function createBlogPost(data) {
    return fetch('http://localhost:8000/app_dev.php/posts', {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => err);
}

export function updateBlogPost(id, data) {
    return fetch('http://localhost:8000/app_dev.php/posts/' + id, {
        method: 'PUT',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => err);
}

export function deleteBlogPost(id) {
    return fetch('http://localhost:8000/app_dev.php/posts/' + id, {
        method: 'DELETE',
        mode: 'CORS'
    }).then(res => res)
        .catch(err => err)
}