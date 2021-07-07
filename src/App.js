import { useState, useEffect, useCallback } from 'react'
import { useDispatch, connect } from "react-redux";
import { addTask, getAddtask, updateTask, deleteTask } from './Redux/Action/taskAction';
import Bell from '../src/Images/bell.svg';
import OkIcon from '../src/Images/okicon.svg';
import Remove from './Images/remove.svg';
import User from './Images/profilepic.jpg';
import Clock from './Images/clock.svg';
import Calender from './Images/calender.png';
import './App.css';


const UserId = "user_6beec459915f4507a8d2520e60e03c3e";

const AssignUser = [{

  user_id: "user_6beec459915f4507a8d2520e60e03c3e",
  name: "Subi Sir",
  user_status: "accepted"
},
{
  user_id: "user_6beec459915f4507a8d2520e60e03c3es",
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
  const [showDropdown, setShowDropdown] = useState(false)
  const [timeOption, setTimeOption] = useState([])
  const [count, setCount] = useState(0)
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

  const chooseTime = (data) => {
    task.time.value = data
    setShowDropdown(false)
  }

  const addTasks = () => {
    handleCancel()
    setShowAddtask(false)
    setShowtask(true)
    setRemove(false)
  }

  const TimeDropdownGenerate = () => {
    // Push Am Times
    let timeOptionsam = ["12:00 AM", "12:30 AM"]
    let startHouram = 0
    let startMinam = 30
    for (let i = 0; i < 22; i++) {
      if (startMinam % 30 === 0 && startMinam !== 0) {
        timeOptionsam.push((startHouram + 1) + ":00 AM")
        startMinam = 0
        startHouram += 1
      } else {
        timeOptionsam.push((startHouram) + ":" + (startMinam + 30) + " AM")
        startMinam = 30
      }

    }

    // Push Pm Times
    let timeOptionspm = ["12:00 PM", "12:30 PM"]
    let startHourpm = 0
    let startMinpm = 30
    for (let i = 0; i < 23; i++) {
      if (startMinpm % 30 === 0 && startMinpm !== 0) {
        timeOptionspm.push((startHourpm + 1) + ":00 PM")
        startMinpm = 0
        startHourpm += 1
      } else {
        timeOptionspm.push((startHourpm) + ":" + (startMinpm + 30) + " PM")
        startMinpm = 30
      }

    }
    setTimeOption(timeOptionsam.concat(timeOptionspm))
  }

  const viewDropdown = () => {
    TimeDropdownGenerate()
    setShowDropdown(true)

  }

  const onsubmit = useCallback((data) => {
    var hms = task.time.value;
    let time = hms.slice(0, -3) + ":00"
    var a = time.split(':');
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
    } else if (task.assignuser.value === "") {
      alert("Assign User Field Required")
      return
    }

    if (data === "update") {
      setUpdatebtn(false)
      dispatch(updateTask(taskList[indexrow].id, UserId, task, seconds))
    } else {
      dispatch(addTask(UserId, task, seconds))
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
    let updatetime = timeFormat[0] >= 12 ? "PM" : "AM"
    let showTime = customtime + " " + updatetime

    task.description.value = taskList[id].task_msg
    task.date.value = taskList[id].task_date
    task.time.value = showTime
    AssignUser.map((data) => {
      if (taskList[id].assigned_user === data.user_id) {
        task.assignuser.value = data.name
      }
    })


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
  const increament = () => {
    setCount(count + 1)
  }

  const deccreament = () => {
    setCount(count - 1)
  }
  return (
    <div className="container" onClick={showDropdown ? () => setShowDropdown(!showDropdown) : null}>
      <div className="leftBorder" />
      <div className="taskHeaderContainer">
        <div className="header" />
        <div className="taskContainer">
          <div className="taskDescription">
            <div className="descriptionBox">
              <div className="descrippName" >TASKS  </div>
              <div className="taskincreament">{taskList.length}</div>
            </div>
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
                    <input className="taskDate" type="date" placeholder="" data-date-open-on-focus="true" data-date-inline-picker="true" onChange={(e) => checkValidation(e, "date")} value={task.date.value} />
                  </div>
                </div>
                <div className="fielddateView">
                  <label className="taskName">Time</label>
                  <div className="container">

                    <div className="menu-bar-item" >
                      <div className="menu-bar-link" type="time" onClick={viewDropdown} >
                        <div className="timeiconView"><img className="clockIcon" src={Clock} /></div>
                        <input className="taskTime" value={task.time.value} onClick={viewDropdown} />
                      </div>
                      <div className={"mega-menu" + " " + showDropdown}>
                        <div className="dropdownContent">
                          <div className="dropdownlabel">Time</div>
                          <div className="timeContainer timeOptionArrow">
                            <div>{timeOption.map((data) => {
                              return (
                                <div className="viewTimings" onClick={() => chooseTime(data)}>{data}</div>
                              )
                            })} </div>
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
                  <option value="" disabled selected hidden> Choose....</option>
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
          {count}

          <button onClick={increament}>Increament</button>
          <button onClick={deccreament}>DEcreament</button>
          {showAddtask &&
            <div className="allTasklist">
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
                      {showEdit === index ?
                        <div className="editIcon tooltip" onClick={() => editTasklist(index)}><div className="editIconshow">✎</div>
                          <span className="tooltiptext editTaskPosition">Edit Task</span>
                        </div>
                        : null}
                      <div className="bellIcon tooltip" onMouseEnter={() => handlemouseEnter(index)}>
                        <img src={Bell} />
                        <span className="tooltiptext bellTaskPosition">Snooze this Task to appear in your at a later date</span>
                      </div>
                      <img src={OkIcon} className="okIcon" />
                    </div>
                  </div>
                )
              })}
            </div>}
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
