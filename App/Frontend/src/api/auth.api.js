export async function login(email, password) {
    return fetch('http://localhost:9001/user/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(function (response) {
            if (response.status === 200) {
                return response.json()
            }
            else {
                throw new Error("Invalid credentials")
            }
        })
}