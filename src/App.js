import { useState, useEffect } from 'react'
import './App.css';
import { useDispatch, connect } from "react-redux";
import { addTask, getAddtask, updateTask, deleteTask } from './Redux/Action/taskAction';
import Bell from '../src/Images/bell.svg';
import OkIcon from '../src/Images/okicon.svg';
import Remove from './Images/remove.svg';
import User from './Images/user.svg';

const AccessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjUyNDAzMTEsIm5iZiI6MTYyNTI0MDMxMSwianRpIjoiZjNlYjgzYTgtMjM4Ny00ZDM5LWIwYmEtNDZlZmU1MGZhZThlIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.pQSfEzNzYv_IVtPFkUKFucl1SSIqpmKnx4Jlxdhi7IY";

const UserId = "user_6beec459915f4507a8d2520e60e03c3e";

const AssignUser = [{

  user_id: "user_6beec459915f4507a8d2520e60e03c3e",
  name: "Subi Sir",
  user_status: "accepted"
},
{
  user_id: "user_6beec459915f4507a8d2520e60e03c3e",
  name: "mahotom411",
  user_status: "pending"
}]

function App(props) {
  const dispatch = useDispatch();
  const [showtask, setShowtask] = useState(false)
  const [showAddtask, setShowAddtask] = useState(true)
  const [assignuser, setAssignuser] = useState({})
  const [taskList, setTaskList] = useState([])
  const [showEdit, setShowEdit] = useState()
  const [remove, setRemove] = useState(false)
  const [updatebtn, setUpdatebtn] = useState(false)
  const [indexrow, setIndexrow] = useState()
  const [task, setTask] = useState({
    description: { value: "" },
    date: { value: "" },
    time: { value: "" },
    assignuser: { value: "" },
  });

  useEffect(() => {
    dispatch(getAddtask())

    let User = []
    AssignUser.map((data) => {
      if (data.user_status === "accepted") {
        User.push({ id: data.user_id, value: data.name })
      }
    })
    setAssignuser(User)
  }, []);


  useEffect(() => {
    setTaskList(props.GetTask)
  }, [props.GetTask])


  function checkValidation(data, key) {
    let dynObj = {
      value: data.target.value,
    };
    setTask((prevState) => ({
      ...prevState,
      [key]: dynObj,

    }));
  }

  const addTasks = () => {
    setShowAddtask(false)
    setShowtask(true)
  }

  const onsubmit = (data) => {
    var hms = task.time.value;
    var a = hms.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    if (task.description.value === "") {
      alert("Task Field Required")
      return
    } else if (task.date.value === "") {
      alert("Date Field Required")
      return
    } else if (task.time.value === "") {
      alert("Time Field Required")
      return
    }

    if (data === "update") {
      setUpdatebtn(false)
      dispatch(updateTask(taskList[indexrow].id, UserId, task, seconds)).then(res => {
        handleCancel()
      })
    } else {
      dispatch(addTask(UserId, task, seconds, AccessToken)).then(res => {
        handleCancel()

      })
    }
    setShowtask(false)
    setRemove(false)
    setShowAddtask(true)
  }

  const handleCancel = () => {
    let Form_key = ["description", "date", "time", "assignuser"];
    Form_key.map((data) => {
      return (
        task[data].value = ""
      )
    });
    setTask((prevState) => ({
      ...prevState,
    }));
    setShowtask(false)
    setShowAddtask(true)
  };

  const handlemouseEnter = (id) => {
    setShowEdit(id)
  }

  const editTasklist = (id) => {
    setIndexrow(id)
    setRemove(true)
    setShowtask(true)
    setShowAddtask(false)
    setUpdatebtn(true)

    let customtime = new Date(taskList[id].task_time * 1000).toISOString().substr(11, 8)

    task.description.value = taskList[id].task_msg
    task.date.value = taskList[id].task_date
    task.time.value = customtime
    task.assignuser.value = taskList[id].assigned_user

    setTask((prevState) => ({
      ...prevState,

    }));
  }

  const deletedTask = () => {
    dispatch(deleteTask(taskList[indexrow].id)).then(res => {
      alert("Are you sure you want to delete this task")
      handleCancel()
    })
    setShowtask(false)
    setShowAddtask(true)
  }


  return (
    <div className="container">
      <div className="taskDescription">
        <div className="descriptionBox">TASKS  {taskList.length} </div>
        <div className="btnAdd tooltip" onClick={addTasks}>+
          <span className="tooltiptext">New Task</span>
        </div>
      </div>

      {showtask &&
        <div className="taskFields">

          <div className="fieldView" >
            <label className="taskName">Task Description</label>
            <input className="tasknameInput" onChange={(e) => checkValidation(e, "description")} value={task.description.value} />
          </div>

          <div className="dateTime">
            <div className="fielddateView">
              <label className="taskName">Date</label>
              <input className="taskDate" type="date" onChange={(e) => checkValidation(e, "date")} value={task.date.value} />
            </div>
            <div className="fielddateView">
              <label className="taskName">Time</label>
              <input className="taskTime" type="time" step="2" onChange={(e) => checkValidation(e, "time")} value={task.time.value} />
            </div>
          </div>

          <div className="fieldView" >
            <label className="taskName">Assign User</label>
            <select className="tasknameInput" onChange={(e) => checkValidation(e, "assignuser")} value={task.assignuser.value} >
              {assignuser.map((val) => {
                return (
                  <option >{val.value}</option>
                )
              })}
            </select >
          </div>

          <div className="customBtn">
            {remove && <div className="removeIcon tooltip" onClick={deletedTask}>
              <img src={Remove} />
              <span className="tooltiptext">Delete Task</span>
            </div>}
            <div className="btn_view">
              <button className="cancelBtn" onClick={handleCancel}>Cancel</button>
              <button className="saveBtn" onClick={() => onsubmit(updatebtn ? "update" : "")}>Save</button>
            </div>
          </div>

        </div>
      }
      {showAddtask &&
        <>
          {taskList.map((data, index) => {
            return (
              <div className="addingTask" onMouseLeave={() => setShowEdit()}>

                <div className="prof_Name">
                  <img src={User} className="img_view" />
                  <div>
                    <div className="showTaskname">{data.task_msg}</div>
                    <div className="showTaskdate">{`${new Date(data.task_date).getDate()}/${new Date(data.task_date).getMonth() + 1}/${new Date(data.task_date).getFullYear()}`}</div>
                  </div>
                </div>

                <div className="taskicons"  >
                  {showEdit === index ? <div className="editIcon tooltip" onClick={() => editTasklist(index)}><div className="editIconshow">✎</div>
                    <span className="tooltiptext">Edit This Task</span>
                  </div> : null}
                  <div className="bellIcon tooltip" onMouseEnter={() => handlemouseEnter(index)}>
                    <img src={Bell} />
                    <span className="tooltiptext">Snooze this Task to appear in your at a later date</span>
                  </div>
                  <img src={OkIcon} className="okIcon" />
                </div>

              </div>
            )
          })
          }
        </>
      }
    </div>
  );
}

const mapStateToProps = (state) =>
({
  GetTask: state.TaskReducer.getAddtask
});
export default connect(mapStateToProps)(App);
