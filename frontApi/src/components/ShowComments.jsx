import { useState, useEffect, React } from 'react'
import axios from 'axios'

export const ShowComments = () => {

    const { id } = req.params.id

    const URL = "https://jsonplaceholder.typicode.com/posts/"+id+"/comments"

    const [comments, setComments] = useState([])

    useEffect(() => {
        getComments()
    }, [])

    //Procedimiento para obtener comentarios
    const getComments = async () => {
        const res = await axios.get(URL)
        setComments(res.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>PostId</th>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comment) => (
                                <tr key={comment.id}>
                                    <td>{comment.postId}</td>
                                    <td>{comment.id}</td>
                                    <td>{comment.name}</td>
                                    <td>{comment.email}</td>
                                    <td>{comment.body}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
