import { GET_ADDTASK } from '../Utils/constant';
import { apiurl } from '../Utils/baseurl';

const AccessTokens = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjUyNDAzMTEsIm5iZiI6MTYyNTI0MDMxMSwianRpIjoiZjNlYjgzYTgtMjM4Ny00ZDM5LWIwYmEtNDZlZmU1MGZhZThlIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.pQSfEzNzYv_IVtPFkUKFucl1SSIqpmKnx4Jlxdhi7IY";

export const addTask = (UserId, task, seconds, AccessToken) => async dispatch => {
    console.log( seconds, "AccessToken")
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + AccessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "assigned_user": UserId,
                "task_date": task.date.value,
                "task_time": seconds,
                "is_completed": 0,
                "time_zone": seconds,
                "task_msg": task.description.value
            }
        )
    };

    fetch(apiurl, requestOptions)
        .then(res => {
            dispatch(getAddtask())

        })
}


export const getAddtask = () => async dispatch => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + AccessTokens,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };
    fetch(apiurl, requestOptions)
        .then(response => response.json())
        .then(data => {
            dispatch({ type: GET_ADDTASK, payload: data.results })
        });
}


export const updateTask = (index, UserId, task, seconds) => async dispatch => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + AccessTokens,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "assigned_user": UserId,
                "task_date": task.date.value,
                "task_time": seconds,
                "is_completed": 0,
                "time_zone": seconds,
                "task_msg": task.description.value
            }
        )
    };
    fetch(apiurl + '/' + index, requestOptions)
        .then(res => {
            dispatch(getAddtask())
        })
}

export const deleteTask = (index) => async dispatch => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + AccessTokens,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    };
    fetch(apiurl + '/' + index, requestOptions)
        .then(res => {
            dispatch(getAddtask())

        })
}




