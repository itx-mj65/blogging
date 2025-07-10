export const deletedata = async (endpoint) => {
    const c = confirm("Are You Sure You Want To Delete ?")
    if (c) {
        try {
            const response = await fetch(endpoint, {
                method: "DELETE",
                credentials: "include"
            })
            const data = response.json()
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return true

        } catch (error) {
            return false
            console.log(error)

        }

    } else {
        return false
    }
} 