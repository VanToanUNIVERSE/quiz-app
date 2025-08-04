export const logout = (setUser) => {
    fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.message);
        setUser('');
        localStorage.clear();
    })
    .catch(err => console.log('Error:', err));
};
