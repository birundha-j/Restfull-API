import { useState, useEffect, useCallback } from 'react'
import './App.css';
import { useDispatch, connect } from "react-redux";
import { addTask, getAddtask, updateTask, deleteTask } from './Redux/Action/taskAction';
import Bell from '../src/Images/bell.svg';
import OkIcon from '../src/Images/okicon.svg';
import Remove from './Images/remove.svg';
import User from './Images/user.svg';
import Clock from './Images/clock.svg';
import Calender from './Images/calender.png'

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

const timeFormat = ["7:00 am", "7:30 am", "8:00 am", "8:30 am"]

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
  const [showDropdown, setShowDropdown] = useState(false)
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


  // function checkValidation(data, key) {
  //   setTask((prevState) => ({
  //     ...prevState,
  //     description: data.target.value,
  //     date: data.target.value,
  //     assignuser: data.target.value

  //   }));
  // }

  // const chooseTime = (data) => {
  //   setTask((prevState) => ({
  //     ...prevState,
  //     time: data
  //   }));
  //   setShowDropdown(false)
  // }

  const chooseTime = (data) => {
    task.time.value = data
    setShowDropdown(false)
  }

  const addTasks = () => {
    handleCancel()
    setShowAddtask(false)
    setShowtask(true)
  }

  const viewDropdown = () => {
    setShowDropdown(true)

  }


  const onsubmit = useCallback((data, taskLists) => {
    var hms = task.time.value;
    let time = hms.slice(0, -3) + ":00"
    var a = time.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    console.log(seconds, a, time, "time")


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
    console.log(taskList, "taskist")

    if (data === "update") {
      setUpdatebtn(false)
      dispatch(updateTask(taskList[indexrow].id, UserId, task, seconds))
    } else {
      dispatch(addTask(UserId, task, seconds, AccessToken))
    }
    setShowtask(false)
    setRemove(false)
    setShowAddtask(true)
  }, [task])

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

    let customtime = new Date(taskList[id].task_time * 1000).toISOString().substr(11, 8).slice(0, -3)
    let timeFormat = customtime.split(':')
    let updatetime = timeFormat[0] >= 12 ? "pm" : "am"
    let showTime = customtime + " " + updatetime

    task.description.value = taskList[id].task_msg
    task.date.value = taskList[id].task_date
    task.time.value = showTime
    task.assignuser.value = taskList[id].assigned_user

    setTask((prevState) => ({
      ...prevState,

    }));
  }

  const deletedTask = () => {
    dispatch(deleteTask(taskList[indexrow].id)).then(res => {
      alert("Are you sure you want to delete this task?")
      handleCancel()
    })
    setShowtask(false)
    setShowAddtask(true)
  }
  return (
    <div className="container">
      <div className="leftBorder" />
      <div className="taskHeaderContainer">
        <div className="header" />
        <div className="taskContainer">
          <div className="taskDescription">
            <div className="descriptionBox">TASKS  {taskList.length} </div>
            <div className="btnAdd tooltip" onClick={addTasks}>+
              <span className="tooltiptext addTaskPosition">New Task</span>
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
                  <div className="dateView">
                    <div className="timeiconView"><img className="clockIcon" src={Calender} /></div>
                    <input className="taskDate" type="date" placeholder="" onChange={(e) => checkValidation(e, "date")} value={task.date.value} />
                  </div>
                </div>
                <div className="fielddateView">
                  <label className="taskName">Time</label>
                  <div className="container">

                    <div className="menu-bar-item" >
                      <div className="menu-bar-link" type="time" onClick={viewDropdown} >
                        <div className="timeiconView"><img className="clockIcon" src={Clock} /></div>
                        <input className="taskTime" onChange={() => checkValidation(task.time.value, "time")} value={task.time.value} onClick={viewDropdown} />

                      </div>

                      <div className={"mega-menu" + " " + showDropdown}>
                        <div className="dropdownContent">
                          <div className="dropdownlabel">Time</div>
                          <div className="timeContainer">
                            {timeFormat.map((data, index) => {
                              return (
                                <div className="viewTimings" onClick={() => chooseTime(data)}>{data}</div>
                              )
                            })}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
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
                  <span className="tooltiptext deleteTaskPosition">Delete Task</span>
                </div>}
                <div className="btn_view">
                  <button className="cancelBtn" onClick={handleCancel}>Cancel</button>
                  <button className="saveBtn" onClick={() => onsubmit(updatebtn ? "update" : "", task)}>Save</button>
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
                        <span className="tooltiptext editTaskPosition">Edit Task</span>
                      </div> : null}
                      <div className="bellIcon tooltip" onMouseEnter={() => handlemouseEnter(index)}>
                        <img src={Bell} />
                        <span className="tooltiptext bellTaskPosition">Snooze this Task to appear in your at a later date</span>
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
      </div>
    </div>
  );
}

const mapStateToProps = (state) =>
({
  GetTask: state.TaskReducer.getAddtask
});
export default connect(mapStateToProps)(App);
